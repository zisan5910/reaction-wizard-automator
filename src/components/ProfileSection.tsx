
import { motion } from 'framer-motion';
import { Element } from 'react-scroll';
import { Download, ScrollText } from './icons';
import { cn } from '../lib/utils';

interface ProfileSectionProps {
  language: 'en' | 'bn';
  content: any;
  scrollToSection: (section: string) => void;
}

const ProfileSection = ({ language, content, scrollToSection }: ProfileSectionProps) => {
  return (
    <Element name="profile">
      <header
        className={cn(
          'relative pt-24 pb-16 overflow-hidden',
          'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
          'text-white'
        )}
      >
        {/* Simple background overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Profile Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/75 to-blue-500/75 rounded-full blur-xl opacity-75"></div>
              <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
              <img
                src="/profile.jpg"
                alt="Md Ridoan Mahmud Zisan"
                className="w-56 h-56 rounded-full border-4 border-white/20 shadow-2xl relative z-10"
              />
            </motion.div>

            {/* Profile Content */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                  {content[language].name}
                </h1>
                <p className="text-xl md:text-2xl mb-6 text-slate-200">
                  {content[language].role}
                </p>
                <p className="text-lg max-w-2xl mx-auto lg:mx-0 mb-8 text-slate-300 leading-relaxed">
                  {content[language].statement}
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
              >
                <a
                  href="/Resume.pdf"
                  download="Md Ridoan Mahmud Zisan.pdf"
                  className={cn(
                    'px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-lg',
                    'bg-white text-slate-900 hover:bg-slate-100'
                  )}
                >
                  <Download size={20} />
                  {content[language].downloadCV}
                </a>
                <button
                  onClick={() => scrollToSection('certificates')}
                  className={cn(
                    'px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-lg',
                    'bg-transparent border-2 border-white/30 text-white',
                    'hover:bg-white/10 hover:border-white/50'
                  )}
                >
                  <ScrollText size={20} />
                  {content[language].certifications}
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </header>
    </Element>
  );
};

export default ProfileSection;
