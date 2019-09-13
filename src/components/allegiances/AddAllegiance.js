import React, { useEffect, useState } from "react";
import { Segment, Button, Modal, Icon, Loader } from "semantic-ui-react";
import styled from "styled-components";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import useGetToken from "../utils/useGetToken";
import { useSelector, useDispatch } from "react-redux";
import { ADD_ALLEGIANCE } from "../../reducers/userReducer";

const AddAllegiance = props => {
  const [data, setData] = useState({ allegiances: [] });

  //Fetches logged in user's info from redux store.
  const loggedInUser = useSelector(state => state.userReducer.loggedInUser);
  const dispatch = useDispatch();

  //Fetches Auth0 token for axios call
  const [token] = useGetToken();

  useEffect(() => {
    if (loggedInUser) {
      const fetchData = async () => {
        if (token) {
          try {
            const allegiances = await axiosWithAuth([token]).get(
              `/allegiances`
            );
            setData({ allegiances: allegiances.data.allegiances });
          } catch {
            console.log("Something went wrong");
          }
        }
      };

      fetchData();
    }
  }, [token, loggedInUser, dispatch]);

  const addAllegiance = async allegiance => {
    if (token) {
      try {
        console.log(loggedInUser.id, allegiance);
        const userAllegiance = await axiosWithAuth([token]).post(
          `/users_allegiances/`,
          {
            user_id: loggedInUser.id,
            allegiance_id: allegiance.id
          }
        );
        const relation = userAllegiance.data.relationExists;
        console.log(relation);
        const newAllegiance = {
          id: allegiance.allegiance_id,
          name: allegiance.allegiance_name,
          image: allegiance.allegiance_image
        };
        dispatch({ type: ADD_ALLEGIANCE, payload: newAllegiance });
        const push = () => props.history.push(`/profile`);
        setTimeout(push, 1000);
      } catch {
        console.log("Something went wrong.");
      }
    }
  };

  return (
    <Segment
      raised
      color="blue"
      style={{ width: "90%", margin: "auto", marginBottom: "15%" }}
    >
      {data.allegiances.length ? (
        <LogoHolder>
          {data.allegiances.map(allegiance => (
            <div key={allegiance.id} style={{ margin: "1% 2% 2%" }}>
              <Modal
                closeIcon
                trigger={<AllegianceLogo src={allegiance.image} />}
              >
                <Modal.Header>{allegiance.allegiance_name}</Modal.Header>
                <Modal.Actions>
                  <Button
                    onClick={() => addAllegiance(allegiance)}
                    color="green"
                    inverted
                  >
                    <Icon name="add" /> Declare Allegiance
                  </Button>
                </Modal.Actions>
              </Modal>
            </div>
          ))}
        </LogoHolder>
      ) : (
        <Loader active size="large">
          Loading
        </Loader>
      )}
    </Segment>
  );
};

const LogoHolder = styled.div`
  width: 98%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-left: 1%;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const AllegianceLogo = styled.img`
  border-color: black;
  object-fit: cover;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid black;
  flex: 0 0 auto;
  box-shadow: 3px 4px 8px 3px rgba(0, 0, 0, 0.2);
`;

export default AddAllegiance;
