// src/components/Games.tsx
import React, { useEffect, useState } from 'react';
import Labubu from '../assets/id-11134207-7r98v-lzlhcz9db2jxbb-removebg-preview.png';
import bgLabubu from '../assets/bg_labubu.jpg';
import { fetchUserScore, updateUser } from '../apis/userCRUD';

interface UserData {
  username: string;
  points: number;
  clickPower: number;
}

interface GamesProps {
  userData: UserData;
}

const Games: React.FC<GamesProps> = ({ userData }) => {
  const [points, setPoints] = useState<number>(userData.points);
  const [pointsPerClick, setPointsPerClick] = useState<number>(userData.clickPower);
  const [upgradeCost, setUpgradeCost] = useState<number>(10);

  const handleClick = () => {
    const newPoints = points + pointsPerClick;
    setPoints(newPoints);
    updateUser(userData.username, newPoints, pointsPerClick);
  };

  const handleUpgrade = () => {
    if (points >= upgradeCost) {
      setPoints(points - upgradeCost);
      setPointsPerClick(pointsPerClick + 1);
      setUpgradeCost(upgradeCost * (pointsPerClick+1));
      updateUser(userData.username, points - upgradeCost, pointsPerClick + 1);
    }
  };

  useEffect(() => {
    const fetchScore = async () => {
      const usersData = await fetchUserScore(userData.username);
      setPoints(usersData.points);
      setPointsPerClick(usersData.clickPower);
    };
    fetchScore();
  }, [userData.username]);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Clicker Area */}
      <div
        className="w-3/4 flex justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bgLabubu})`, height: '100vh' }}
      >
        <button
          onClick={handleClick}
          className="absolute bg-pink-300 p-10 rounded-full shadow-md hover:bg-pink-400 transition-transform duration-300 ease-in-out transform hover:scale-125 focus:outline-none"
        >
          <img
            src={Labubu}
            alt="click image"
            className="w-32 h-32 transition-transform duration-300 ease-in-out transform hover:scale-125"
          />
        </button>
      </div>

      {/* Sidebar */}
      <div className="w-1/4 bg-white p-4 shadow-md">
        <h1 className="text-4xl font-bold mb-10 text-pink-300 hover:font-bold hover:text-pink-500 rounded transition-transform duration-300 ease-in-out transform hover:scale-95">
          Clicker Game
        </h1>
        <p className="mb-2 font-bold text-xl">Points: {points}</p>
        <p className="mb-2">Points Per Click: {pointsPerClick}</p>

        <button
          onClick={handleUpgrade}
          disabled={points < upgradeCost}
          className={`mt-4 w-full p-2 bg-pink-500 text-white font-bold rounded transition-transform duration-300 ease-in-out transform hover:scale-95 ${
            points < upgradeCost ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Upgrade Click (Cost: {upgradeCost})
        </button>
      </div>
    </div>
  );
};

export default Games;
