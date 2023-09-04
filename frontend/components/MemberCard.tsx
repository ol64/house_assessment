import "@/styles/MemberCard.css";
import blankPhoto from "@/images/blank_profile.png";
import Image from "next/image";

interface IProps {
  member: Record<string, any>;
}

export default function MemberCard({ ...props }: IProps) {
  const member_info = props.member?.["member-info"];

  return (
    <div className="card" data-style="width: 18rem;">
      <center>
        <Image
          className="headshot"
          src={blankPhoto}
          alt="Headshots"
          width={200}
          height={200}
        />
      </center>
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
