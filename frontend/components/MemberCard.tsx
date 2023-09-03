import "@/styles/MemberCard.css";

interface IProps {
  member: Record<string, any>;
}

export default function MemberCard({ ...props }: IProps) {
  const member_info = props.member?.["member-info"];

  return (
    <div className="card" data-style="width: 18rem;">
      <img className="card-img-top" src="..." alt="Headshots" />
      <div className="card-body">
        <h5 className="card-title">{`${member_info.firstname} ${member_info.lastname}`}</h5>
        <div className="card-text">
          <p>State: {`${member_info.state?.["state-fullname"]}`}</p>
          <p>Party: {`${member_info.party}`}</p>
        </div>
      </div>
    </div>
  );
}
