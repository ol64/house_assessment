import { getMembers, getMemberName } from '@/utils/helpers';
import MemberCard from './MemberCard';

import '@/styles/MemberList.css';

interface IProps {
  members: Array<any>;
}

export default function MemberList({ ...props}: IProps) {
  return (
    <ol className="member_list">
      {props.members.map((member: any) =>
        <MemberCard key={member.statedistrict} member={member}/>
      )}
    </ol>
  )
}