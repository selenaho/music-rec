import React, { useState, useEffect } from 'react';

function Artists(){
    //get artist data
    const [data, setData] = useState([]);
      useEffect(() => {
        const fetchData = async () => {
          const response = await fetch('spotify/top-artists');
          const result = await response.json();
          //console.log("result:")
          setData(result);
          console.log(result);
        };
    
        fetchData();
      }, []);

    return(
        <div>
            <p>These are your top artists</p>
            {data.map(d => <p>{d.name}: {d.followers} followers</p>)}
            
        </div>
    )
}

export default Artists;