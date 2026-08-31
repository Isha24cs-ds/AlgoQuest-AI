import {
  Code2,
  Brain,
  Trophy,
  BookOpen,
  ArrowRight,
  Swords,
  Users,
  Shield,
  Zap,
  Clock,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const journeys = [
  {
    title: "Placement Preparation",
    subtitle: "DSA, Aptitude & Technical Interviews",
    description: "Master essential algorithms, dynamic programming, and problem-solving patterns tailored for top tier tech interviews.",
    icon: Trophy,
    badge: "Most Popular",
    color: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30",
    route: "/dsa",
    stats: "250+ Problems",
  },
  {
    title: "Full Stack Engineer",
    subtitle: "React • Node.js • Systems",
    description: "Build production-grade web apps from scratch with modern frontend frameworks, REST APIs, and database design.",
    icon: Code2,
    badge: "Career Path",
    color: "from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30",
    route: "/fullstack",
    stats: "12 Real Projects",
  },
  {
    title: "AI & Machine Learning",
    subtitle: "Neural Nets • LLMs • Python",
    description: "Dive into machine learning pipelines, deep learning models, prompt engineering, and AI agent integration.",
    icon: Brain,
    badge: "Advanced",
    color: "from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30",
    route: "/ai",
    stats: "8 AI Labs",
  },
  {
    title: "Core Computer Science",
    subtitle: "OS • DBMS • Networks • OOP",
    description: "Strengthen fundamental concepts in operating systems, relational database architecture, and computer networking.",
    icon: BookOpen,
    badge: "Fundamentals",
    color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
    route: "/corecs",
    stats: "4 Core Modules",
  },
];

export default function JourneySelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12 w-full">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-xs font-bold text-amber-800 uppercase tracking-wide">
            <Sparkles size={14} className="text-amber-600 fill-amber-500" />
            <span>Select Track</span>
          </div>

          <h1 className="font-heading text-3xl font-extrabold sm:text-5xl tracking-tight text-slate-900">
            Engineering Curricula & Tracks
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            Choose a path to access interactive visualizers, step-by-step coding problem sets, and AI mentorship.
          </p>
        </div>

        {/* Main Journey Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          {journeys.map((journey) => {
            const Icon = journey.icon;

            return (
              <div
                key={journey.title}
                className="leetcode-card rounded-xl p-7 border border-slate-200 bg-white flex flex-col justify-between group hover:border-blue-500/50"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div
                      className={`h-11 w-11 rounded-lg bg-gradient-to-br ${journey.color} border flex items-center justify-center`}
                    >
                      <Icon size={22} />
                    </div>
                    <span className="text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
                      {journey.badge}
                    </span>
                  </div>

                  <h2 className="font-heading text-xl font-bold mt-5 text-slate-900 group-hover:text-blue-600 transition-colors">
                    {journey.title}
                  </h2>
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    {journey.subtitle}
                  </p>

                  <p className="text-xs leading-relaxed text-slate-600 mt-3 font-normal">
                    {journey.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    {journey.stats}
                  </span>

                  <button
                    onClick={() => navigate(journey.route)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 group-hover:translate-x-0.5 transition-all"
                  >
                    <span>Enter Track</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Competitive Arena Banner */}
        <div className="mt-10">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-blue-500/10 border border-amber-300/80 p-8 sm:p-9 shadow-xs">
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3.5 max-w-2xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-amber-500 text-slate-950 font-bold border border-amber-400">
                    <Swords size={22} className="stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-heading text-2xl font-bold text-slate-900">
                        Competitive Coding Arena
                      </h2>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-600 animate-pulse"></span>
                        LIVE CONTEST
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 font-medium">
                      Challenge engineers in real-time 1v1 or multiplayer algorithmic sprint battles.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs">
                    <Users size={14} className="text-amber-600" />
                    <span>Create / Join Rooms</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs">
                    <Shield size={14} className="text-blue-600" />
                    <span>Rated Matchmaking</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs">
                    <Clock size={14} className="text-emerald-600" />
                    <span>20-Min Contests</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs">
                    <Zap size={14} className="text-orange-600" />
                    <span>Real-time Judgement</span>
                  </span>
                </div>
              </div>

              <div className="flex-shrink-0">
                <button
                  onClick={() => navigate("/arena")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-xs border border-amber-400 transition-all"
                >
                  <span>Enter Arena</span>
                  <ArrowRight size={16} className="stroke-[2.5]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}