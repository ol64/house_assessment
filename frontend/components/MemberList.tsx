import { getMembers, getMemberName } from '@/utils/helpers';

import '@/styles/MemberList.css';

interface IProps {
  members: Record<string, any>;
}

export default function MemberList({ ...props}: IProps) {
  return (
    <ol className="member-list">
      {getMembers(props.members).map((member: any) =>
        <li key={member.statedistrict}>
          {getMemberName(member)}
        </li>
      )}
    </ol>
  )
}