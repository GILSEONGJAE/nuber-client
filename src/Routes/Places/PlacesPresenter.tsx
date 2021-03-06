import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
import Place from "../../Components/Place";
import styled from "../../typed-components";
import { getPlaces } from "../../types/api";

const Container = styled.div`
  padding: 0 40px;
`;

const SLink = styled(Link)`
  text-decoration: underline;
`;

interface IProps {
  data?: getPlaces;
  loading: boolean;
}

const PlacesPresenter: React.SFC<IProps> = ({ data, loading }) => {
  const GetMyPlaces = data;
  if (
    GetMyPlaces &&
    GetMyPlaces.GetMyPlaces &&
    GetMyPlaces.GetMyPlaces.ok &&
    GetMyPlaces.GetMyPlaces.places
  ) {
    const places = GetMyPlaces.GetMyPlaces.places;
    return (
      <React.Fragment>
        <Helmet>
          <title>Places | dely</title>
        </Helmet>
        <Header title={"Places"} backTo={"/"} />
        <Container>
          {!loading && places && places.length === 0 && "You have no places"}
          {!loading &&
            places &&
            places.map(place => (
              <Place
                key={place!.id}
                id={place!.id}
                fav={place!.isFav}
                name={place!.name}
                address={place!.address}
              />
            ))}
          <SLink to={"/add-place"}>Add some places!</SLink>
        </Container>
      </React.Fragment>
    );
  } else {
    return <div>Cannot load</div>;
  }
};

export default PlacesPresenter;
