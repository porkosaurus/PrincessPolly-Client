import React, { useState, useEffect } from "react";
import ColorFilter from "../../components/color-filter/color-filter";

const Shop = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      fetch('https://protected-dusk-79821-d54a1f8d392c.herokuapp.com/shop')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
    }, []);

    return (
          <ColorFilter items={data}/>
      );
}

export default Shop