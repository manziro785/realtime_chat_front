import { MessagesSquare, Smile, Zap, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden flex flex-col">
      <div className="flex-1">
        <header className="flex justify-between items-center mb-16 mx-10 mt-5">
          <div className="flex items-center gap-2">
            <span className="text-blue-400 text-2xl font-bold">AzhChat</span>
          </div>
          <button
            onClick={() => navigate("/auth")}
            className="px-4 py-2 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all disabled:opacity-50 disabled:pointer-events-none outline-none border border-slate-600 bg-slate-800 text-slate-200 hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-offset-2"
          >
            Login
          </button>
        </header>

        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-6">
            <div className="inline-flex items-center gap-3 mb-4">
              <MessagesSquare className="w-26 h-26 text-500" />
            </div>
            <p className="text-slate-300 text-xl mb-8">
              Create groups and message with friends
            </p>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate("/auth")}
              className="h-10 px-10 text-base inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all disabled:opacity-50 disabled:pointer-events-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              Start
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16 px-4">
          <div>
            <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 hover:shadow-lg transition-shadow rounded-xl">
              <div className="py-6">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Smile className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-blue-300 font-semibold">
                    Chat with Friends
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Send messages to your friends in real-time.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 hover:shadow-lg transition-shadow rounded-xl">
              <div className="py-6 px-4">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-blue-300 font-semibold">Create Groups</h3>
                  <p className="text-slate-400 text-sm">
                    Chat together with friends in group conversations.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 hover:shadow-lg transition-shadow rounded-xl">
              <div className="py-6">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Crown className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-blue-300 font-semibold">
                    Share Achievements
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Show your friends your milestones and get feedback.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center text-slate-400 text-sm py-6 border-t border-slate-700 mt-auto">
        <p>Tilekmat Azhygulov :)</p>
      </footer>
    </div>
  );
};

export default HomePage;
