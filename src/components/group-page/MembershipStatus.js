import React from "react";
import { Button } from "semantic-ui-react";

import styled from "styled-components";

const MembershipStatus = props => {
  return (
    <GroupMemberStatus>
      {props.userType && (
        <>
          {props.userType === "admin" && (
            <>
              <Button>Admin</Button>
            </>
          )}
          {props.userType === "invited" && (
            <>
              <Button>Accept Invite</Button>
            </>
          )}
          {props.userType === "member" && (
            <>
              <Button>Member</Button>
            </>
          )}
        </>
      )}
      {props.userType === "" && <Button>Join Group</Button>}
    </GroupMemberStatus>
  );
};

const GroupMemberStatus = styled.div`
  display: flex;
  justify-content: center;
`;

export default MembershipStatus;
