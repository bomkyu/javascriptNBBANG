
async function logJSONData() {
  const response = await fetch("http://api.odcloud.kr/api/3045495/v1/uddi:255a6fa5-e8f5-48d9-8e38-b64a3862f7b4?page=1&perPage=100&serviceKey=Napll8TrA7FPYrKg3yx4n%2FTgcv%2BWCBd0XHBQmrB392TJiRhRwqpOr3qTHcH%2Bo8lLmBODgwXDyhQdI41tRPuBLw%3D%3D");
  const jsonData = await response.json();
  console.log(jsonData);
}

logJSONData();

