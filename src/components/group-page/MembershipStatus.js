import React from "react";
import { Button, Label } from "semantic-ui-react";

import styled from "styled-components";

const MembershipStatus = props => {
  return (
    <GroupMemberStatus>
      {props.userType && (
        <>
          {props.userType === "admin" && (
            <>
              {/* <Button>Admin</Button> */}
              <Label as="a" basic color="red">
                Admin
              </Label>
            </>
          )}
          {props.userType === "invited" && (
            <>
              <Button>Accept Invite</Button>
              <Label as="a" basic color="green">
                Accept Invite
              </Label>
            </>
          )}
          {props.userType === "member" && (
            <>
              {/* <Button>Member</Button> */}
              <Label as="a" basic color="blue">
                Member
              </Label>
            </>
          )}
        </>
      )}
      {props.userType === "non-member" && <Button>Join Group</Button>}
    </GroupMemberStatus>
  );
};

const GroupMemberStatus = styled.div`
  display: flex;
  justify-content: center;
`;

export default MembershipStatus;
