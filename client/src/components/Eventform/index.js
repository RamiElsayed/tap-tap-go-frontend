import * as React from "react";
import { useNavigate } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Card, CardContent, Container, Grid } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import AddressInput from "./AddressInput";
import DropZone from "../dropZone/index";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_TAGS } from "../../graphQL/queries";
import { ADD_EVENT } from "../../graphQL/mutations";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { async } from "@firebase/util";

export default function EventForm() {
  const navigate = useNavigate();
  const { loading, data } = useQuery(QUERY_TAGS);

  const completeEventInformation = React.useRef();

  const [keywords, setKeywords] = React.useState([]);

  React.useEffect(() => {
    if (data?.tags?.length) {
      setKeywords(
        data.tags.map((el) => {
          return el;
        })
      );
    }
  }, [data]);

  const [newEvent, setNewEvent] = React.useState({
    eventName: "",
    date: null,
    price: "",
    ageGroup: "",
    description: "",
    maxAttendees: "",
  });

  const [tags, setTags] = React.useState({
    tags: [],
    keywords: [],
  });
  const [eventAddress, setAddress] = React.useState({
    buildingNumber: "",
    streetName: "",
    cityName: "",
    postcode: "",
  });
  const [imageUpload, setImageUpload] = React.useState([]);

  const [formNumber, setFormNumber] = React.useState(false);

  const updateState = (event, setter) => {
    const { value, name } = event.target;
    let valueX = value;
    if (name === "price" || name === "maxAttendees") {
      valueX = parseInt(value);
    }
    setter((prev) => {
      return { ...prev, [name]: valueX };
    });
  };

  const updateImage = (arrayImgs) => {
    setImageUpload(arrayImgs);
  };

  const handleKeywords = (event) => {
    const { value } = event.target;
    let tagId = value.map((key) => {
      let answer = keywords.find((el) => el.tagName === key);
      return answer._id;
    });
    setTags((prev) => {
      return { ...prev, keywords: value, tags: tagId };
    });
  };

  function updateDate(input, key) {
    let date = new Date(input);
    setNewEvent((prev) => {
      return { ...prev, [key]: date };
    });
  }

  // React.useEffect(() => {
  //   completeEventInformation.current = {
  //     ...newEvent,
  //     tags: tags.tags,
  //     // images: [...imageUpload],
  //     location: eventAddress,
  //   };
  // }, [newEvent, eventAddress, tags, imageUpload]);

  const [createEvent] = useMutation(ADD_EVENT);

  const uploadImage = async (image) => {
    if (image == null) return;
    const imageRef = ref(storage, `events/images/${image.name + v4()}`);
    let snapshot = await uploadBytes(imageRef, image);
    let URL = await getDownloadURL(snapshot.ref);
    return await URL;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      Promise.all(
        imageUpload.map(async (item) => {
          let imageURL = await uploadImage(item.imageLink);
          return { imageLink: imageURL };
        })
      )
        .then((images) => {
          console.log(images);
          completeEventInformation.current = {
            ...newEvent,
            tags: tags.tags,
            images: images,
            location: eventAddress,
          };
        })
        .then(async () => {
          console.log(completeEventInformation);
          const { data: eventData } = await createEvent({
            variables: { input: { ...completeEventInformation.current } },
          });
          if (eventData?.createEvent?._id) {
            const eventID = eventData.createEvent._id;
            navigate(`/event/${eventID}`, { replace: true });
          }
        });
    } catch (e) {
      console.error(e);
    }
  };

  function renderForm() {
    if (formNumber === true) {
      return (
        <>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={2}
            component="form"
            onSubmit={handleFormSubmit}
          >
            <Grid item xs={12}>
              <TextField
                onChange={(value) => updateState(value, setNewEvent)}
                value={newEvent.description}
                fullWidth
                multiline
                rows={12}
                name="description"
                label="Description"
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                color="secondary"
                variant="contained"
                fullWidth
                onClick={() => setFormNumber((prev) => !prev)}
              >
                Previous
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button color="info" type="submit" fullWidth variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        </>
      );
    } else if (formNumber === false) {
      return (
        <>
          <Grid container rowSpacing={2} columnSpacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                onChange={(value) => updateState(value, setNewEvent)}
                value={newEvent.eventName}
                fullWidth
                name="eventName"
                label="Event Name"
              />
            </Grid>

            <AddressInput
              updateState={updateState}
              setAddress={setAddress}
              eventAddress={eventAddress}
            />
            <Grid item xs={12} md={6}>
              <TextField
                onChange={(value) => updateState(value, setNewEvent)}
                value={newEvent.maxAttendees}
                fullWidth
                type="number"
                inputProps={{ min: 4, max: 10 }}
                name="maxAttendees"
                label="Max attendees"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start date"
                  disablePast
                  value={newEvent.date}
                  onChange={(newValue) => updateDate(newValue, "date")}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                name="price"
                fullWidth
                id="firstName"
                label="Price"
                type="number"
                value={newEvent.price}
                inputProps={{
                  max: 100,
                  min: 0,
                }}
                autoFocus
                onChange={(value) => updateState(value, setNewEvent)}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id="ageGroup">Age</InputLabel>
                <Select
                  labelId="ageGroup"
                  value={newEvent.ageGroup}
                  label="Age"
                  name="ageGroup"
                  onChange={(value) => updateState(value, setNewEvent)}
                >
                  <MenuItem value={"Teenagers"}>Teenagers</MenuItem>
                  <MenuItem value={"Adult"}>Adult</MenuItem>
                  <MenuItem value={"Senior"}>Senior</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="tags">Keywords</InputLabel>
                <Select
                  labelId="tags"
                  multiple
                  value={tags.keywords}
                  onChange={handleKeywords}
                  input={<OutlinedInput id="tags" label="tags" />}
                  renderValue={(selected, index) => {
                    return (
                      <Box
                        key={index}
                        sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                      >
                        {selected.map((value, i) => {
                          return <Chip key={i} label={value} />;
                        })}
                      </Box>
                    );
                  }}
                >
                  {keywords.map((keyword, index) => (
                    <MenuItem key={index} value={keyword.tagName}>
                      {keyword.tagName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <DropZone updateImage={updateImage} files={imageUpload} />
            </Grid>
            {/* <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Image 1"
                autoFocus
                value={imageUpload[0].imageLink}
                onChange={(value) => updateImage(value, setImageUpload, 0)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Image 2"
                autoFocus
                value={imageUpload[1].imageLink}
                onChange={(value) => updateImage(value, setImageUpload, 1)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Image 3"
                autoFocus
                value={imageUpload[2].imageLink}
                onChange={(value) => updateImage(value, setImageUpload, 2)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Image 4"
                autoFocus
                value={imageUpload[3].imageLink}
                onChange={(value) => updateImage(value, setImageUpload, 3)}
              />
            </Grid> */}
            <Grid item xs={12}>
              <Button
                color="primary"
                onClick={() => setFormNumber((prev) => !prev)}
                fullWidth
                variant="contained"
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </>
      );
    }
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        flexGrow: "1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div>
        <Typography
          gutterBottom
          textAlign="center"
          component="h3"
          variant="h3"
          fontWeight="500"
        >
          Starting a new event
        </Typography>
        <Card>
          <CardContent>{renderForm()}</CardContent>
        </Card>
      </div>
    </Container>
  );
}
