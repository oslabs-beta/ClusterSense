![](https://hackmd.io/_uploads/HJtzS2el6.png)
# ClusterSense - Kafka Cluster Management Tool

---
## Table of Contents

- [Product Description](#product-description)
- [Web App](#Web-App)
- [Install Locally](#install-locally)
- [Contribute](#contribute)
- [Our Team](#Contributors)
- [License](#license)

---
## Product Description

Cluster Sense is an open-source product dedicated to developing a Kafka cluster visualization tool. Our tool is designed with developers in mind, to help our users visualize their metrics and have an understanding of their clusters' health. 

# Features
Real-time Metrics and Charts: ClusterSense provides a GUI with important metrics, updated in real-time for insights into your Kafka clusters' health and performance through visually appealing charts.

Seamless Prometheus Integration: Setting up Prometheus to scrape Kafka metrics has never been easier. View our sample YML file to guide you through the prometheus configuration, ensuring that the process is a smooth experience.

Profile Port Selection: The application's top navbar has a dropdown that stores your previous port selections for easy navigation between seperate Kafka Instances for seamless monitoring of multiple brokers or clusters.

## Tech Stack

<div align='center'>

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node](https://img.shields.io/badge/-node-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/express-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prometheus](https://img.shields.io/badge/Prometheus-E7532D?style=for-the-badge&logo=prometheus&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4EA94B?style=for-the-badge&logo=postgres&logoColor=white)
![Apache Kafka](https://img.shields.io/badge/apache%20kafka-%2320232a.svg?style=for-the-badge&logo=apachekafka&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)
![Testing Library](https://img.shields.io/badge/testing%20library-323330?style=for-the-badge&logo=testing-library&logoColor=red)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
</div>

---

## Web App

To begin using ClusterSense, navigate to <a href="http://www.ClusterSense.org">ClusterSense.org</a> and create an account.

- Ensure prometheus is running and connected with your broker/cluster
- Enter the port prometheus is currently occupying into the form and hit submit; we have included a sample prometheus.yml file in the _sampleconfig_ directory to streamline your prometheus configuration.
- View real-time data of your Apache-Kafka instance


### Install Locally

Alternatively, if you would prefer to run ClusterSense locally, you may fork and clone our Github repository.

- Create a .env file in the main directory and create a variable PG_URL set equal to your PostgreSQL server instance URI
- Instantiate the database using the CLI with these table formats:
  - `CREATE TABLE "users" (
   user_id serial PRIMARY KEY,
   username varchar(50) NOT NULL,
   password varchar(255),
   oauth_provider varchar(255),
   oauth_id varchar(255),
   oauth_access_token varchar(255),
   oauth_refresh_token varchar(255),
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`
  - `CREATE TABLE cluster(
   id SERIAL PRIMARY KEY,
   user_id SERIAL REFERENCES users(user_id),
   cluster_port INTEGER NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`
- In the terminal run:
  - `npm install`
  - `npm run dev`
- Once the application is running, navigate to localhost:3030, create an account, and input the port of your Prometheus server.

---

## Contribute
If you would like to contribute to this product and improve upon it's current functionality or add a feature, please fork the repository and submit a pull request.
Some of our planned features for ClusterSense include:
- Open Authorization
- Light/Dark Mode
- Adding User-Defined Charts to GUI
- Alerting with user-defined service level indicators

---

## Contributors
<div align='center'>

  <table>
  <tr>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/47452487?s=64&v=4" width="140px;" alt=""/>
      <br />
      <sub><b>Wanlu Ding</b></sub>
      <br />
      [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/wanlu-ding/)
      <br />
      [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/WanluD)
      <br />
    </td>
    <td align="center">
      <img src="https://avatars.githubusercontent.com/u/69995214?v=4" width="140px;" alt=""/>
      <br />
      <sub><b>Allen Hui</b></sub>
      <br />
      [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/allen-hui-7b590b9a/)
      <br />
      [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://www.linkedin.com/in/allen-hui-7b590b9a/)
      <br />
    </td>
    <td align="center">
      <img src="https://media.licdn.com/dms/image/D4E03AQEnHhBIgWgE-w/profile-displayphoto-shrink_200_200/0/1695831173465?e=1701302400&v=beta&t=ftTIheSq1xHOdx-89QXwlEq0r-Lzz6PlZUlkYhmDpmo" width="140px;" alt=""/>
      <br />
      <sub><b>Sam Johnson</b></sub>
      <br />
      [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/samuel-johnson-dpt/)
      <br />
      [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SFJohnson24)
      <br />
    </td>
     <td align="center">
      <img src="https://avatars.githubusercontent.com/u/26197909?v=4" width="140px;" alt=""/>
      <br />
      <sub><b>Daniel (Jung Tae) Lee</b></sub>
        <br />
      [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jungtaelee/)
      <br />
      [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/jungtaelee0128")
      <br />
    </td>
</table>
</div>

---

# License
This project is licensed under the [**MIT License**](https://choosealicense.com/licenses/mit/)
