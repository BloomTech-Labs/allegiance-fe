import React from "react";

import styled from "styled-components";

const MembershipStatus = props => {
	return (
		<GroupMemberStatus>
			{props.userType && (
				<>
					{props.userType === "admin" && (
						<>
							<Membership>Admin</Membership>
							<Button>Leave</Button>
						</>
					)}
					{props.userType === "invited" && (
						<>
							<Membership>Invited</Membership>
							<Button>Join</Button>
						</>
					)}
					{props.userType === "member" && (
						<>
							<Membership>Member</Membership>
							<Button>Leave</Button>
						</>
					)}
				</>
			)}
			{props.userType === "non-member" && (
				<>
					<NotMember>Holder</NotMember>
					{/* <Membership>Non-Mem</Membership> */}
					<Button>Join</Button>
				</>
			)}
		</GroupMemberStatus>
	);
};

const GroupMemberStatus = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const Membership = styled.div`
  margin: 4% auto;
  width: 80%;  
  color: grey;
  border: 1px solid grey
  border-radius: 10%;
`;

const NotMember = styled.div`
	margin: 4% auto;
	width: 80%;
	color: white;
`;

const Button = styled.div`
	margin: 4% auto;
	width: 80%;
	color: #f2f2f2;
	border-radius: 10%;
	background-color: #5eaeff;
	padding: 1% 0;
`;

export default MembershipStatus;
