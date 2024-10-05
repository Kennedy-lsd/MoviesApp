import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Image,
  Container,
  Dropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC<{
  username: string;
  avatar: string;
  onLogout: () => void;
  onSearch: (query: string) => void;
}> = ({ username, avatar, onLogout, onSearch }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isMain, setIsMain] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleToggle = () => setShowMenu(!showMenu);

  const handleToCreate = () => {
    navigate("/main/create");
  };

  const handleToMain = () => {
    navigate("/main");
  };

  const handleSearch = () => {
    navigate("/main");
    onSearch(searchQuery);
  };

  useEffect(() => {
    const checkIsMain = () => {
      const storedIsMain = localStorage.getItem("isMain");
      setIsMain(!!storedIsMain); // Set isMain based on whether it exists
    };

    checkIsMain(); // Check on mount
    window.addEventListener('storage', checkIsMain);

    return () => {
      window.removeEventListener('storage', checkIsMain);
    };
  }, []);

  return (
    <Navbar className="py-3" style={{ backgroundColor: "#141414" }}>
      <Container fluid>
        <Navbar.Brand
          onClick={handleToMain}
          className="d-flex align-items-center"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
            alt="Netflix"
            style={{ width: "100px", cursor: "pointer" }}
          />
        </Navbar.Brand>

        {isMain && (
          <Form className="d-flex mx-auto">
            <FormControl
              type="text"
              placeholder="Search by genres"
              className="mr-4"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              variant="outline-light"
              className="mr-3"
              style={{ marginRight: "10px", marginLeft: "5px" }}
              onClick={handleSearch}
            >
              Search
            </Button>
            <Button
              onClick={handleToCreate}
              variant="outline-light"
              className="pl-2 ml-4"
            >
              Add
            </Button>
          </Form>
        )}

        <Nav className="ml-auto d-flex align-items-center">
          <span
            className="text-light"
            style={{ fontSize: "1.2rem", marginRight: "20px" }}
          >
            {username}
          </span>

          <Dropdown show={showMenu} onToggle={handleToggle} align="end">
            <Dropdown.Toggle
              as="span"
              onClick={handleToggle}
              style={{ cursor: "pointer" }}
              id="dropdown-user"
            >
              <Image
                src={
                  avatar
                    ? `http://localhost:8000/${avatar}`
                    : "default-avatar.jpg"
                }
                roundedCircle
                style={{ width: "45px", height: "45px", objectFit: "cover" }}
                alt="User"
              />
            </Dropdown.Toggle>

            <Dropdown.Menu align="end">
              <Dropdown.Item onClick={onLogout}>Log Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
