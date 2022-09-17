import { Grid, Typography } from "@mui/material";
import EventCard from "../../components/Cards/EventCard";
import CityCard from "./CityCard";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SEARCH_EVENTS_CITY } from "../../graphQL/mutations";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";

const CityEventsPage = () => {
  const { city } = useParams();

  const [searchEventsByCity, { errorCity, mutationDataCity }] =
    useMutation(SEARCH_EVENTS_CITY);

  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    try {
      const { data } = await searchEventsByCity({
        variables: { input: { city } },
      });

      if (data) {
        setEvents(data.searchByCity);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getEvents();
  }, []);
  useEffect(() => {
    console.log(events);
  }, [events]);

  return (
    <Box className="section__block-14">
      <Typography variant="h2" textAlign="center" my={4}>
        Events in <span style={{ fontWeight: "500" }}> {city}</span>
      </Typography>
      <Grid
        container
        mt="1rem"
        spacing={3}
        width="100%"
        className="section__block-4"
      >
        {events.map((el, i) => {
          return (
            <Grid key={i} item xs={11} sm={10} md={4} lg={3}>
              <EventCard {...el} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CityEventsPage;
