'use client';

import { useState } from 'react';

export default function Home() {
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasWon, setHasWon] = useState(null);
  const [partition, setPartition] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName.trim()) return;

    setIsLoading(true);
    setHasWon(null);
    setShowCelebration(false);

    setTimeout(() => {
      const won = checkWin();
      setHasWon(won);
      setIsLoading(false);
      if (won) {
        setShowCelebration(true);
      }
    }, 2000);
  };

  const hashString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      // A basic hash function (e.g., DJB2-inspired)
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  const getPartition = (name) => {
    const numberOfPartitions = 10;
    const hash = hashString(name);
    return hash % numberOfPartitions;
  }


  const checkWin = () => {
    const partition = getPartition(userName);
    setPartition(partition);
    return partition === 0;
  };


  const getTooltip = () => {
    return <div className="relative">
      <button
        type="button"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
        className="w-6 h-6 bg-blue-500 text-white rounded-full text-sm font-bold hover:bg-blue-600 transition-colors"
      >
        ؟
      </button>
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-72 bg-gray-800 text-white text-sm rounded-lg p-3 shadow-lg z-10">
          <div className="text-right">
            <p className="font-semibold mb-1">الخوارزمية:</p>
            <p className="text-xs mb-2">
              اسمك يتحول لرقم، إذا كان القسم = 0 تفوز!
              <br />
              فرصة الفوز: 10%
            </p>
            <p className="text-xs text-blue-300">
              💡 مبنية على مفهوم Redis/DB Partitioning
            </p>
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h1 className="text-3xl font-bold text-gray-800">
              اربح مقعدك المجاني 🎉
            </h1>
          </div>
          <p className="text-gray-600">
            أدخل اسمك وجرب حظك للحصول على مقعد مجاني في البرنامج!
          </p>
        </div>

        {!isLoading && hasWon === null && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="أدخل اسمك..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              disabled={!userName.trim()}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105"
            >
              جرب حظك! 🍀
            </button>
          </form>
        )}

        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
            <p className="text-gray-600 text-lg">
              جاري التحقق من حظك... 😁
            </p>
            <div className="mt-4">
              <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="bg-green-600 h-full rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {hasWon !== null && !isLoading && (
          <div className="text-center py-8">
            {hasWon ? (
              <div className={`space-y-4`}>
                <div className="text-6xl mb-4">🎊</div>
                <h2 className="text-2xl font-bold text-green-600 mb-2">
                  مبروك، {userName}!
                </h2>
                <p className="text-gray-600 mb-8">
                  ألف مبروك! فزت بمقعد مجاني في البرنامج! 🎉
                </p>
                <div className={`flex space-x-reverse space-x-2 justify-center text-3xl ${showCelebration ? 'animate-bounce' : ''}`}>
                  <span className="animate-bounce">🎈</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>🎊</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎉</span>
                  <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>🏆</span>
                </div>

                <div className="text-gray-600 flex justify-center items-center gap-2">
                  القسم: {partition} {getTooltip()}
                </div>
                
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-6xl mb-4">😔</div>
                <h2 className="text-2xl font-bold text-gray-600 mb-2">
                  حظ أوفر في المرة القادمة، {userName}!
                </h2>

                <div className="text-gray-600 flex justify-center items-center gap-2">
                  القسم: {partition} {getTooltip()}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
