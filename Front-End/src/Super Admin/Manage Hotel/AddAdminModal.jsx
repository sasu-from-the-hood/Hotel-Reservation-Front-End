import Modal from "../Modal";

const AddAdminModal = ({
  isOpen,
  onClose,
  onSubmit,
  newAdmin,
  setNewAdmin,
}) => {
  const handleAdminChange = (e) => {
    setNewAdmin({
      ...newAdmin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newAdmin);
  };

  return (
    <Modal isOpen={isOpen} title="Add New Admin" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={newAdmin.name}
            onChange={handleAdminChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={newAdmin.email}
            onChange={handleAdminChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={newAdmin.password}
            onChange={handleAdminChange}
            required
          />
        </div>
        <div>
          <label>Admin Type</label>
          <input
            type="text"
            name="admin_type"
            value={newAdmin.admin_type}
            onChange={handleAdminChange}
            required
          />
        </div>
        <div>
          <label>Hotel ID</label>
          <input
            type="text"
            name="hotel_id"
            value={newAdmin.hotel_id}
            onChange={handleAdminChange}
            readOnly
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </Modal>
  );
};

export default AddAdminModal;
