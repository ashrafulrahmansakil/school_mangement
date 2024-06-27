import "../css/Service.css";
import Layout from "./../layout/Layout";
import { useState } from "react";

const Service = () => {
  const [items, setItems] = useState([{ name: "", quantity: null, price: null }]);

  const addItem = () => {
    setItems([...items, { name: "", quantity: null, price: null }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index, event) => {
    const { name, value } = event.target;
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setItems(updatedItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + Number(item.quantity) * Number(item.price);
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <>
      <Layout>
        <div className="container">
          <h2>Invoice</h2>
          <form
            onSubmit={handleSubmit}
            className="row rounded bg-body-tertiary p-2 mb-2 g-1 m-auto w-75"
          >
            <div className="col-md-12 text-center mt-3">
              <div className="alert alert-info">
                Subtotal: ${calculateTotal().toFixed(2)}
              </div>
            </div>
            {items.map((item, index) => (
              <div key={index} className="row g-1">
                <div className="col-md-3">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Item name"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    className="form-control"
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    className="form-control"
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, e)}
                  />
                </div>
                <div className="col-md-3 text-end">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="col-md-12 text-center mt-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={addItem}
              >
                Add Item
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Service;

// import "../css/service.css";
// import Layout from "./../layout/Layout";
// import { useState } from "react";

// const Service = () => {
//   const [items, setItems] = useState([{ name: "", quantity: 0, price: 0 }]);

//   const addItem = () => {
//     setItems([...items, { name: "", quantity: 0, price: 0 }]);
//   };

//   const removeItem = (index) => {
//     setItems(items.filter((_, i) => i !== index));
//   };

//   const handleItemChange = (index, event) => {
//     const { name, value } = event.target;
//     const updatedItems = items.map((item, i) =>
//       i === index ? { ...item, [name]: value } : item
//     );
//     setItems(updatedItems);
//   };

//   const calculateTotal = () => {
//     return items.reduce((total, item) => {
//       return total + Number(item.quantity) * Number(item.price);
//     }, 0);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };
//   return (
//     <>
//       <Layout>
//         <div className="container">
//           <h2>Invoice</h2>
//           <form
//             onSubmit={handleSubmit}
//             className="row rounded bg-body-tertiary p-2 mb-2 g-1 m-auto w-75"
//           >
//             {items.map((item, index) => (
//               <div key={index}>
//                 <div className="com-md-6">
//                   <input
//                     type="text"
//                     name="name"
//                     className="form-control"
//                     placeholder="Item name"
//                     value={item.name}
//                     onChange={(e) => handleItemChange(index, e)}
//                   />
//                 </div>
//                 <div className="com-md-6">
//                   <input
//                     className="form-control"
//                     type="number"
//                     name="quantity"
//                     placeholder="Quantity"
//                     value={item.quantity}
//                     onChange={(e) => handleItemChange(index, e)}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <input
//                     className="form-control"
//                     type="number"
//                     name="price"
//                     placeholder="Price"
//                     value={item.price}
//                     onChange={(e) => handleItemChange(index, e)}
//                   />
//                 </div>
//                 <button onClick={() => removeItem(index)}>Remove</button>
//               </div>
//             ))}
//             <button onClick={addItem}>Add Item</button>
//             <div>Subtotal: ${calculateTotal().toFixed(2)}</div>
//           </form>
//         </div>
//       </Layout>
//     </>
//   );
// };
// export default Service;
