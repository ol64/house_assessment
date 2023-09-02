import { getMembers, getMemberName } from '@/utils/helpers';

import '@/styles/MemberCard.css';

interface IProps {
  member: Record<string, any>;
}

export default function MemberCard({ ...props}: IProps) {
  const member_info = props.member?.['member-info']
  return (
    <ol className="member_card">
      <h2>{`${member_info.firstname} ${member_info.lastname}`}</h2>
      <img src="/images/blank_profile.png" />
      <div className="member_info">
        <p>State: {`${member_info.state?.['state-fullname']}`}</p>
        <p>Party: {`${member_info.party}`}</p>
        <p>Committee Assignments</p>
      </div>
    </ol>
  )
}