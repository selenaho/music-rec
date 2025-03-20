import React, { useState, useEffect } from 'react';

function Artists(){
    //get artist data
    const [data, setData] = useState('');
      useEffect(() => {
        const fetchData = async () => {
          const response = await fetch('spotify/top-artists');
          const result = await response.json();
          setData(result.url);
          console.log(result);
        };
    
        fetchData();
      }, []);

    return(
        <div>
            {data}
            <p>These are your top artists</p>
        </div>
    )
}

export default Artists;