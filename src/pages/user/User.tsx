import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { activities, statistics } from "../../data";
import { getUserById } from "../../utils/fetch";
import "./user.scss";
import { useParams } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

type Info = {
  firstName: string;
  lastName: string;
  img: string;
  email: string;
  phone: string;
  createdAt: string;
  verified: boolean;
};

type Activity = {
  id: number;
  text: string;
  time: string;
};

type Chart = {
  dataKeys: { name: string; color: string }[];
  data: { name: string; [key: string]: number }[];
};

type User = {
  userId: number | undefined;
  info: Info;
  chart: Chart | null;
  activities: Activity[] | null;
};

const User = () => {
  const { id } = useParams();

  const { id: userId, ...info } = getUserById(parseInt(id));
  const userStatistics = statistics.find((stat) => stat.userId === userId);
  const userActivities = activities
    .filter((activity) => activity.userId === userId)
    .map(({ userId, ...rest }) => rest);

  const user: User = {
    userId,
    info,
    chart: userStatistics
      ? { dataKeys: userStatistics.dataKeys, data: userStatistics.data }
      : null,
    activities: userActivities.length > 0 ? userActivities : null,
  };

  return (
    <div className="user">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <img src={user.info.img} alt="" />
            <h1>
              {user.info.firstName} {user.info.lastName}{" "}
            </h1>
            <span title="Verified">{user.info.verified && <FaCheck />}</span>
          </div>
          <div className="details">
            <div className="item">
              <span className="itemTitle">E-Mail: </span>
              <span className="itemValue">{user.info.email}</span>
            </div>
            <div className="item">
              <span className="itemTitle">Phone: </span>
              <span className="itemValue">{user.info.phone}</span>
            </div>
            <div className="item">
              <span className="itemTitle">Created At: </span>
              <span className="itemValue">{user.info.createdAt}</span>
            </div>
          </div>
        </div>
        {user.chart ? (
          <div className="chart">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={user.chart.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {user.chart.dataKeys.map((dataKey) => (
                  <Line
                    key={dataKey.name}
                    type="monotone"
                    dataKey={dataKey.name}
                    stroke={dataKey.color}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <span className="empty">No Statistic!</span>
        )}
      </div>
      <div className="activities">
        <h2>Latest Activities</h2>
        {user.activities ? (
          <ul>
            {user.activities.map((activity, index) => (
              <li key={index}>
                <div>
                  <p>{activity.text}</p>
                  <time>{activity.time}</time>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <span className="empty">No Activity!</span>
        )}
      </div>
    </div>
  );
};

export default User;
