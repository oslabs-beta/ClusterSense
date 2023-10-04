// useEffect that will fetch data from prometheus/backend once the form is submitted using the port

//   const getMetricData = async (metric: string): void => {
//     if (!metricList.includes(metric)) return setMetricData([]);
//     try {
//       const response = await axios.get(
//         `http://${server}/api/v1/query?query=${metric}`
//       );
//       setMetricData(response.data.data.result);
//     } catch (err) {
//       console.log(err);
//     }
//   };
