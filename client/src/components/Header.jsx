import { AvatarGroup, Avatar } from "rsuite";
import("../styles/Header.scss");

const styles = {
  width: 300,
  marginBottom: 10,
};

function Header() {
  return (
    <div className="header-wrapper">
      <p>Selam Lgog</p>
      <AvatarGroup>
        <Avatar
          src="https://avatars.githubusercontent.com/u/12592949"
          alt="@superman66"
        />
      </AvatarGroup>
    </div>
  );
}

export default Header;
