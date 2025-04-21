import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

type Endpoint = {
  endpoint_id: string;
  endpoint_name: string;
  endpoint_path: string;
  endpoint_status: number;
};

const Home = () => {
  const emptyEndpoint: Endpoint = {
    endpoint_id: "",
    endpoint_name: "",
    endpoint_path: "",
    endpoint_status: 1,
  };

  const clear_inputs = () => {
    setEndpointName("");
    setEndpointPath("");
  };

  const location = useLocation();
  const { user_id } = location.state || {};
  const [endpointName, setEndpointName] = useState("");
  const [endpointPath, setEndpointPath] = useState("");

  const [selectedEndpoint, setSelectedEndpoint] =
    useState<Endpoint>(emptyEndpoint);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [userEndpoints, setUserEndpoints] = useState<Endpoint[]>([]);

  const BASE_URL = import.meta.env.VITE_BASE_DB_URL;

  if (!user_id) {
    return <div>Error: No user ID found!</div>;
  }

  function pathShortener(path: string) {
    return path.slice(0, 30) + "...";
  }

  const getEndpoints = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/v2/api/user-endpoints/?userID=${user_id}`
      );

      if (!response.ok) throw new Error("Failed to fetch endpoints");

      const data = await response.json();
      setUserEndpoints(data.endpoints);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    getEndpoints();
    const intervalId = setInterval(() => {
      getEndpoints();
    }, 15000);
    return () => clearInterval(intervalId);
  }, []);

  const createEndpoint = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/v2/api/create-endpoint/?userID=${user_id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            endpoint_name: endpointName,
            endpoint_path: endpointPath,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to create endpoint");
      clear_inputs();
      setShowCreate(false); // closes the modal
      getEndpoints();
    } catch (error) {
      console.error("Create error:", error);
    }
  };

  const editEndpoint = async (
    endpoint_id: string,
    endpoint_name: string,
    endpoint_path: string
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/v2/api/edit-endpoint/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endpoint_id,
          endpoint_name,
          endpoint_path,
        }),
      });

      if (!response.ok) throw new Error("Failed to edit endpoint");
      setShowEdit(false); //closes the modal
      getEndpoints();
    } catch (error) {
      console.error("Edit error:", error);
    }
  };

  const deleteEndpoint = async (endpoint_id: string) => {
    try {
      const response = await fetch(
        `${BASE_URL}/v2/api/delete-endpoint/?userID=${user_id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint_id }),
        }
      );

      if (!response.ok) throw new Error("Failed to delete endpoint");
      getEndpoints();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <>
      <div>
        <Button
          variant="primary"
          className="btn-home"
          onClick={() => setShowCreate(true)}
          style={{ float: "right", marginTop: "20px", marginRight: "30px" }}
        >
          Create Endpoint
        </Button>
      </div>

      <div>
        <Modal
          show={showCreate}
          onHide={() => {
            setShowCreate(false);
            clear_inputs();
          }}
          style={{ marginTop: "150px" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <b>Create Endpoint Monitor</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label>Endpoint Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  value={endpointName}
                  onChange={(e) => setEndpointName(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Endpoint Path</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter path"
                  value={endpointPath}
                  onChange={(e) => setEndpointPath(e.target.value)}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowCreate(false);
                clear_inputs();
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={createEndpoint}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>
        <Modal
          show={showEdit}
          onHide={() => {
            setShowEdit(false);
            clear_inputs();
          }}
          style={{ marginTop: "150px" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <b>Edit Endpoint Monitor</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label>Endpoint Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter name"
                  value={endpointName}
                  onChange={(e) => setEndpointName(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Endpoint Path</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter path"
                  value={endpointPath}
                  onChange={(e) => setEndpointPath(e.target.value)}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowCreate(false);
                clear_inputs();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={async () => {
                await editEndpoint(
                  selectedEndpoint.endpoint_id,
                  endpointName,
                  endpointPath
                );
                setShowDelete(false);
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>
        <Modal
          show={showDelete}
          onHide={() => setShowDelete(false)}
          style={{ marginTop: "150px" }}
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-center">
              <b>Delete Endpoint Monitor</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <p>Are you sure you want to delete this Monitor?</p>
          </Modal.Body>
          <div className="row center-div" style={{ marginBottom: "10px" }}>
            <Button
              variant="secondary"
              style={{ float: "left", width: "100px", marginRight: "100px" }}
              onClick={() => setShowDelete(false)}
            >
              No
            </Button>
            <Button
              variant="primary"
              style={{ float: "right", width: "100px" }}
              onClick={async () => {
                await deleteEndpoint(selectedEndpoint.endpoint_id);
                setShowDelete(false);
              }}
            >
              Yes
            </Button>
          </div>
        </Modal>
      </div>
      <div
        className="center-div"
        style={{ paddingTop: "100px", minWidth: "1000px" }}
      >
        <table
          className="table text-center table-hover"
          style={{ borderRadius: "100px" }}
        >
          <thead>
            <tr>
              <th>Endpoint Name</th>
              <th>Endpoint Path</th>
              <th>Endpoint Status</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {userEndpoints.map((endpoint) => (
              <tr key={endpoint.endpoint_id}>
                <td>{endpoint.endpoint_name}</td>
                <td>{pathShortener(endpoint.endpoint_path)}</td>
                <td>
                  <center>
                    <div
                      className=""
                      style={{
                        width: "35px",
                        height: "35px",
                        border: "1px solid black",
                        borderRadius: "3px",
                        backgroundColor:
                          endpoint.endpoint_status === 0 ? "lime" : "red",
                      }}
                    />
                  </center>
                </td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="mx-1"
                    onClick={() => {
                      setSelectedEndpoint(endpoint);
                      setEndpointName(endpoint.endpoint_name);
                      setEndpointPath(endpoint.endpoint_path);
                      setShowEdit(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="mx-1"
                    onClick={() => {
                      setSelectedEndpoint(endpoint);
                      setShowDelete(true);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
