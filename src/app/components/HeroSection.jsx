'use client'
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion'

// cursor component
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  return (
    <motion.div
      className="fixed w-5 h-5 bg-gradient-to-r from-pink-500 to-cyan-400 rounded-full pointer-events-none z-50 mix-blend-difference"
      animate={{
        x: mousePosition.x - 10,
        y: mousePosition.y - 10,
        scale: isHovering ? 2 : 1,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  )
}

// Navigation component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/95 py-4' : 'bg-slate-900/90 py-6'
      } backdrop-blur-lg`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent"
        >
          NP
        </motion.div>
        <div className="hidden md:flex space-x-8">
          {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ y: -2 }}
              className="text-white hover:text-cyan-400 transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}

// socialLinks array with icon URLs
const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/nisal-madura/',
      icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg',
      gradient: 'from-blue-600 to-blue-400',
      hoverColor: 'hover:shadow-blue-500/25'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/NisalMadura',
      icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg',
      gradient: 'from-gray-800 to-gray-600',
      hoverColor: 'hover:shadow-gray-500/25'
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/nisal.perera.146069',
      icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/facebook.svg',
      gradient: 'from-blue-600 to-blue-800',
      hoverColor: 'hover:shadow-blue-600/25'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/nisal_madura_perera?igsh=eHNiY2dqbTBrZ2xt',
      icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg',
      gradient: 'from-pink-500 via-red-500 to-yellow-500',
      hoverColor: 'hover:shadow-pink-500/25'
    }
  ]
  
  // SocialIcons component to handle both image URLs and emojis
  const SocialIcons = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="flex justify-center items-center gap-4 mt-8"
      >
        <span className="text-gray-300 text-sm font-medium">Connect with me:</span>
        <div className="flex gap-3">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className={`w-12 h-12 bg-gradient-to-r ${social.gradient} rounded-full flex items-center justify-center text-white shadow-lg ${social.hoverColor} transition-all duration-300 relative group`}
              title={social.name}
            >
              {/* Check if icon is a URL or emoji */}
              {social.icon.startsWith('http') ? (
                <img 
                  src={social.icon} 
                  alt={social.name}
                  className="w-6 h-6 filter brightness-0 invert"
                />
              ) : (
                <span className="text-lg">{social.icon}</span>
              )}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {social.name}
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    )
  }

// Hero section
const Hero = () => {
  return (
    <section className="relative h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
      {/* Floating shapes */}
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-20"
      />
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
        className="absolute bottom-20 right-20 w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20"
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
      />
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 4 }}
        className="absolute bottom-32 left-20 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 rotate-45"
      />

      {/* Background gradient blob */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-br from-pink-500 to-cyan-400 rounded-full -translate-y-1/4 transform scale-150 mix-blend-multiply filter blur-3xl"
      />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="z-10 text-center px-6 max-w-4xl"
      >
        {/* Developer Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-5 mt-20 flex justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-cyan-400 rounded-full blur opacity-30"></div>
            <img
              src="https://res.cloudinary.com/drqinrgtd/image/upload/v1749724355/90385_A_hxcuj7.jpg"
              alt="Developer"
              className="relative w-32 h-32 md:w-40 md:h-40 object-cover rounded-full shadow-xl border-4 border-white/20"
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold text-white mb-4"
        >
          Hi, I'm <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent"
          >
            Nisal Perera
          </motion.span>
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-2xl md:text-3xl font-semibold text-cyan-400 mb-6"
        >
          Full Stack Developer
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Experienced Full Stack Developer skilled in crafting modern, 
          responsive web applications from frontend to backend. 
          I deliver end-to-end digital solutions that empower business growth and drive innovation.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-r from-pink-500 to-cyan-400 text-white px-8 py-4 rounded-full shadow-2xl font-semibold text-lg hover:shadow-pink-500/25 transition-all duration-300"
          >
            Download CV
          </motion.a>
          
          <motion.a
            href="#socialLinks"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white px-8 py-4 rounded-full shadow-lg font-semibold text-lg transition-all duration-300"
          >
            Contact Me
          </motion.a>
        </motion.div>

        {/* Social Media Icons */}
        <SocialIcons />
      </motion.div>
    </section>
  )
}

// About section
const About = () => {
    return (
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-gray-500 text-lg mb-2">Get To Know More</p>
            <h2 className="text-4xl md:text-5xl font-bold text-black">About Me</h2>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="w-80 h-80 lg:w-96 lg:h-96 bg-gray-100 rounded-3xl overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dkwbnv9vd/image/upload/v1749929443/a-photograph-of-a-young-full-stack-devel_A__WPTv3TeuPc8O-xsNnlw_6Ca4WgqMRY-w0-kxeiuZCA_wlptnw.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
            
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Experience and Education Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 flex flex-col justify-center"
                >
                  <div className="w-8 h-8 mx-auto mb-3 flex items-center justify-center">
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm4-3a1 1 0 00-1 1v1h2V4a1 1 0 00-1-1zM4 9a1 1 0 000 2v5a1 1 0 001 1h10a1 1 0 001-1v-5a1 1 0 100-2H4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-black mb-2">Experience</h3>
                  <p className="text-gray-600 font-semibold text-sm">
                    Board of Investment (BOI)<br />
                    Sri Lanka - 06 Months
                  </p>
                  <p className="text-gray-500 text-sm mt-1">Full Stack Developer</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 flex flex-col justify-center"
                >
                  <div className="w-8 h-8 mx-auto mb-3 flex items-center justify-center">
                    <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-black mb-2">Education</h3>
                  <p className="text-gray-600 font-semibold text-sm">
                    BSc (Hons) in Computing<br />
                    Software Engineering
                  </p>
                  <p className="text-gray-500 text-sm mt-1">Undergraduate</p>
                </motion.div>
              </div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
                className="text-gray-600 leading-relaxed"
              >
                <p>
                I'm an innovative and detail-driven full-stack developer with 6 months of hands-on experience crafting scalable, user-focused web applications. I thrive on solving real-world problems through clean code, modern technologies, and collaborative development. Passionate about continuous learning and digital innovation, I aim to build products that not only perform—but truly connect with users.                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    )
}

// Skills section with tech stack icons
const Skills = () => {
    const skillCategories = [
      {
        title: 'Frontend Development',
        icon: '💻',
        skills: [
          { name: 'HTML5', icon: '📄', color: 'from-orange-500 to-red-500', bgColor: 'bg-orange-50' },
          { name: 'CSS3', icon: '🎨', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50' },
          { name: 'JavaScript', icon: '⚡', color: 'from-yellow-400 to-yellow-500', bgColor: 'bg-yellow-50' },
          { name: 'React', icon: '⚛️', color: 'from-cyan-400 to-blue-500', bgColor: 'bg-cyan-50' },
          { name: 'React Native', icon: '📱', color: 'from-cyan-500 to-blue-600', bgColor: 'bg-cyan-50' },
          { name: 'Next.js', icon: '🔺', color: 'from-black to-gray-800', bgColor: 'bg-gray-50' },
          { name: 'Tailwind CSS', icon: '💨', color: 'from-teal-400 to-cyan-500', bgColor: 'bg-teal-50' },
          { name: 'Bootstrap', icon: '🅱️', color: 'from-purple-600 to-indigo-600', bgColor: 'bg-purple-50' },
          { name: 'Figma', icon: '🎯', color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-50' }
        ]
      },
      {
        title: 'Backend Development',
        icon: '⚙️',
        skills: [
          { name: 'Node.js', icon: '🟢', color: 'from-green-600 to-green-700', bgColor: 'bg-green-50' },
          { name: 'Express.js', icon: '🚀', color: 'from-gray-700 to-black', bgColor: 'bg-gray-50' },
          { name: 'PHP', icon: '🐘', color: 'from-indigo-600 to-purple-700', bgColor: 'bg-indigo-50' },
          { name: 'Java', icon: '☕', color: 'from-red-600 to-orange-600', bgColor: 'bg-red-50' },
          { name: 'C#', icon: '🔷', color: 'from-blue-600 to-purple-600', bgColor: 'bg-blue-50' },
          { name: 'Python', icon: '🐍', color: 'from-blue-500 to-yellow-500', bgColor: 'bg-blue-50' },
          { name: 'Spring Boot', icon: '🍃', color: 'from-green-600 to-green-700', bgColor: 'bg-green-50' },
          { name: '.NET', icon: '🔵', color: 'from-blue-600 to-purple-600', bgColor: 'bg-blue-50' }
        ]
      },
      {
        title: 'Databases & APIs',
        icon: '🗄️',
        skills: [
          { name: 'MySQL', icon: '🐬', color: 'from-blue-600 to-orange-500', bgColor: 'bg-blue-50' },
          { name: 'MSSQL', icon: '🔴', color: 'from-red-600 to-red-700', bgColor: 'bg-red-50' },
          { name: 'SQLite', icon: '📦', color: 'from-blue-500 to-gray-600', bgColor: 'bg-blue-50' },
          { name: 'MongoDB', icon: '🍃', color: 'from-green-500 to-green-700', bgColor: 'bg-green-50' },
          { name: 'Firebase', icon: '🔥', color: 'from-yellow-500 to-red-500', bgColor: 'bg-yellow-50' },
          { name: 'REST APIs', icon: '🔗', color: 'from-teal-500 to-blue-500', bgColor: 'bg-teal-50' },
          { name: 'Postman', icon: '📮', color: 'from-orange-500 to-red-500', bgColor: 'bg-orange-50' }
        ]
      },
      {
        title: 'Tools & Technologies',
        icon: '🛠️',
        skills: [
          { name: 'Git', icon: '🌿', color: 'from-red-500 to-orange-500', bgColor: 'bg-red-50' },
          { name: 'GitHub', icon: '🐙', color: 'from-gray-800 to-black', bgColor: 'bg-gray-50' },
          { name: 'VS Code', icon: '💙', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50' },
          { name: 'Visual Studio', icon: '🟣', color: 'from-purple-600 to-indigo-600', bgColor: 'bg-purple-50' },
          { name: 'Docker', icon: '🐳', color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50' },
          { name: 'Ubuntu', icon: '🐧', color: 'from-orange-600 to-red-600', bgColor: 'bg-orange-50' },
          { name: 'Arduino', icon: '🔌', color: 'from-teal-600 to-cyan-600', bgColor: 'bg-teal-50' },
          { name: 'WordPress', icon: '📝', color: 'from-blue-600 to-gray-700', bgColor: 'bg-blue-50' }
        ]
      },
      {
        title: 'Cloud & Platforms',
        icon: '☁️',
        skills: [
          { name: 'Google Cloud', icon: '🌐', color: 'from-blue-500 to-green-500 via-red-500 via-yellow-500', bgColor: 'bg-blue-50' },
          { name: 'AWS', icon: '☁️', color: 'from-orange-500 to-yellow-600', bgColor: 'bg-orange-50' },
          { name: 'Microsoft Azure', icon: '🔷', color: 'from-blue-600 to-cyan-500', bgColor: 'bg-blue-50' },
          { name: 'DigitalOcean', icon: '🌊', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50' },
          { name: 'Google Colab', icon: '📊', color: 'from-yellow-500 to-orange-500', bgColor: 'bg-yellow-50' },
          { name: 'Roboflow', icon: '🤖', color: 'from-purple-600 to-pink-600', bgColor: 'bg-purple-50' },
          { name: 'Kaggle', icon: '📈', color: 'from-cyan-500 to-blue-600', bgColor: 'bg-cyan-50' }
        ]
      }
    ]
  
    return (
      <section id="skills" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
          >
            My Tech Stack
          </motion.h2>
          
          <div className="grid lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                viewport={{ once: true }}
                className="bg-slate-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <span className="text-3xl mr-3">{category.icon}</span>
                  <h3 className="text-lg font-semibold text-slate-800">{category.title}</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`relative ${skill.bgColor} rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-gradient-to-b ${skill.color}`}
                    >
                      <div className="flex flex-col items-center text-center">
                        <span className="text-2xl mb-1">{skill.icon}</span>
                        <span className="text-xs font-medium text-slate-700 leading-tight">{skill.name}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Featured Technologies Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-semibold text-slate-800 mb-8">Core Technologies</h3>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {[
                { name: 'React', icon: '⚛️', desc: 'Frontend Library', color: 'from-cyan-400 to-blue-500' },
                { name: 'Node.js', icon: '🟢', desc: 'Backend Runtime', color: 'from-green-600 to-green-700' },
                { name: 'JavaScript', icon: '⚡', desc: 'Programming Language', color: 'from-yellow-400 to-yellow-500' },
                { name: 'Python', icon: '🐍', desc: 'Data & Backend', color: 'from-blue-500 to-yellow-500' },
                { name: 'MongoDB', icon: '🍃', desc: 'NoSQL Database', color: 'from-green-500 to-green-700' },
                { name: 'AWS', icon: '☁️', desc: 'Cloud Platform', color: 'from-orange-500 to-yellow-600' },
                { name: 'Docker', icon: '🐳', desc: 'Containerization', color: 'from-blue-500 to-cyan-500' },
                { name: 'Git', icon: '🌿', desc: 'Version Control', color: 'from-red-500 to-orange-500' },
                { name: 'Figma', icon: '🎯', desc: 'UI/UX Design', color: 'from-purple-500 to-pink-500' },
                { name: 'Next.js', icon: '🔺', desc: 'React Framework', color: 'from-black to-gray-800' }
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className={`bg-gradient-to-br ${tech.color} rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center min-w-[100px] border border-white/20 backdrop-blur-sm`}
                >
                  <span className="text-3xl mb-2 filter drop-shadow-sm">{tech.icon}</span>
                  <span className="text-sm font-semibold text-white mb-1 drop-shadow-sm">{tech.name}</span>
                  <span className="text-xs text-white/80 text-center">{tech.desc}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  
  // Custom Icons
  const Github = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  )
  
  const ExternalLink = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15,3 21,3 21,9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  )
  
  const Figma = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.02s-1.354-3.02-3.019-3.02h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.015-4.49-4.491S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.02s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.02s1.354 3.02 3.019 3.02h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zM24 12.75c0 2.489-2.026 4.515-4.515 4.515s-4.515-2.026-4.515-4.515 2.026-4.515 4.515-4.515S24 10.261 24 12.75zm-4.515-3.019c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019 3.019-1.355 3.019-3.019-1.354-3.019-3.019-3.019z"/>
    </svg>
  )
  
  const Projects = () => {
    const [activeTab, setActiveTab] = useState('All')
  
    const tabs = ['All', 'Web App', 'Website', 'Mobile App', 'UI/UX']
  
    const projects = [
      {
        id: 1,
        title: 'Sri Lanka Railway Train Location Tracker',
        description: 'Real-time train tracking system for Sri Lankan railways with location updates, schedule management, and passenger information using microservices architecture.',
        category: 'Web App',
        image: 'https://res.cloudinary.com/dkwbnv9vd/image/upload/v1750413910/Sri-Lanka-By-Train_sr9mfu.webp',
        tags: ['React', 'Node.js', 'Express.js', 'MySQL', 'MongoDB', 'JWT', 'Microservices', 'Digital Ocean', 'REST API'],
        github: 'https://github.com/NisalMadura/SriLanka-Railway-Tracking-API.git',
        gradient: 'from-blue-500 to-purple-600'
      },
      {
        id: 2,
        title: 'Aqua Swimming Academy',
        description: 'Professional swimming academy website with course information, instructor profiles, registration system, and student management features.',
        category: 'Website',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop&crop=entropy',
        tags: ['WordPress', 'cPanel', 'GoDaddy', 'Cloudflare'],
        live: 'https://aquaswimacademy.com/',
        gradient: 'from-cyan-500 to-blue-600'
      },
      {
        id: 3,
        title: 'CampLanka iOS Mobile App',
        description: 'Comprehensive camping experience app for Sri Lanka with location discovery, trip planning, weather integration, and advanced iOS features like MapKit and Face Recognition.',
        category: 'Mobile App',
        image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&h=400&fit=crop&crop=entropy',
        tags: ['Swift', 'SwiftUI', 'Firebase', 'MapKit', 'EventKit', 'Push Notifications', 'Face Recognition', 'RapidAPI'],
        github: 'https://github.com/NisalMadura/CampLanka.git',
        gradient: 'from-green-500 to-teal-600'
      },
      {
        id: 4,
        title: 'Weather Web App',
        description: 'Interactive weather application displaying comprehensive weather details including temperature, humidity, wind speed, and rainfall data for any location worldwide.',
        category: 'Web App',
        image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop&crop=entropy',
        tags: ['HTML', 'CSS', 'JavaScript', 'Weather API'],
        github: 'https://github.com/NisalMadura/Weather-App.git',
        gradient: 'from-orange-500 to-red-600'
      },
      {
        id: 5,
        title: 'Game-Quest Multi-Game Platform',
        description: 'Interactive gaming platform featuring 5 different game types with advanced data structures implementation and MVC architecture for optimal performance.',
        category: 'Web App',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop&crop=entropy',
        tags: ['Java', 'MySQL', 'Data Structures', 'MVC Architecture'],
        github: 'https://github.com/NisalMadura/Game-Quest.git',
        gradient: 'from-purple-500 to-pink-600'
      },
      {
        id: 6,
        title: 'Gym Management System',
        description: 'Complete gym management solution with member registration, workout tracking, payment processing, and trainer scheduling with REST API integration.',
        category: 'Web App',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop&crop=entropy',
        tags: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'REST API'],
        github: 'https://github.com/NisalMadura/Gym-management-system.git',
        gradient: 'from-red-500 to-orange-600'
      },
      {
        id: 7,
        title: 'Help Desk Management System',
        description: 'Professional IT support system developed for BOI IT Department with ticket management, priority handling, and automated workflow processes.',
        category: 'Web App',
        image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop&crop=entropy',
        tags: ['PHP', 'HTML', 'CSS', 'MS SQL', 'JavaScript'],
        github: 'https://github.com/NisalMadura/Help-desk-management-system.git',
        gradient: 'from-indigo-500 to-purple-600'
      },
      {
        id: 8,
        title: 'User Declarant Approval System',
        description: 'Enterprise-level approval system for BOI companies with automated workflows, document management, and microservices architecture for scalability.',
        category: 'Web App',
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop&crop=entropy',
        tags: ['C#', 'ASP.NET', 'HTML', 'CSS', 'MS SQL', 'Microservices'],
       
        gradient: 'from-blue-600 to-indigo-600'
      },
      {
        id: 9,
        title: 'Green Light Solar Inventory Management',
        description: 'Comprehensive inventory management system for solar energy equipment with stock tracking, supplier management, and automated reporting features.',
        category: 'Web App',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop&crop=entropy',
        tags: ['C#', 'MS SQL'],
        github: 'https://github.com/NisalMadura/GreenLightSolar.git',
        gradient: 'from-green-400 to-emerald-600'
      },
      {
        id: 10,
        title: 'Square Game iOS App',
        description: 'Engaging puzzle game for iOS devices built with modern SwiftUI framework, featuring intuitive controls and progressive difficulty levels.',
        category: 'Mobile App',
        image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&h=400&fit=crop&crop=entropy',
        tags: ['Swift', 'SwiftUI', 'iOS Development'],
        github: 'https://github.com/NisalMadura/square-game.git',
        gradient: 'from-yellow-500 to-orange-500'
      },
      {
        id: 11,
        title: 'CampLanka iOS App UI/UX Design',
        description: 'Complete design system for CampLanka mobile application including low and high fidelity wireframes, user journey mapping, and interactive prototypes.',
        category: 'UI/UX',
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop&crop=entropy',
        tags: ['Figma', 'UI Design', 'UX Research', 'Prototyping', 'Wireframing'],
        figma: 'https://www.figma.com/design/3cMeLFZ5SzQSViCAaOI6lR/CampLanka?node-id=1-2&t=0BJsQJFOjTShDYLn-1',
        gradient: 'from-green-500 to-teal-600'
      },
      {
        id: 12,
        title: 'BOC Bank Mobile App Redesign',
        description: 'Modern redesign of Sri Lanka Bank of Ceylon mobile application with improved user experience, accessibility features, and contemporary banking interface.',
        category: 'UI/UX',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=entropy',
        tags: ['Figma', 'Mobile Design', 'Banking UX', 'Redesign'],
        figma: 'https://www.figma.com/design/NIrgJniTTZCRZ0D51NU5G2/BOC-Mobile-App?t=MzsOF3hkXH95sWO1-1',
        gradient: 'from-blue-600 to-cyan-600'
      },
      {
        id: 13,
        title: 'CookIt Meal Planner App Design',
        description: 'Comprehensive meal planning application design for iOS with recipe management, nutritional tracking, and shopping list integration featuring both low and high fidelity designs.',
        category: 'UI/UX',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&crop=entropy',
        tags: ['Figma', 'iOS Design', 'Food App', 'Meal Planning', 'Prototyping'],
        figma: 'https://www.figma.com/design/pz2L0E3hw3SjNqox3hJYsY/CookIt?node-id=0-1&t=aJfYiL5kT8Mc9G5V-1',
        gradient: 'from-orange-500 to-red-500'
      },
      {
        id: 14,
        title: 'BOI Company Site Approval Design',
        description: 'Professional web interface design for BOI company approval processes with streamlined workflows and government compliance standards.',
        category: 'UI/UX',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&crop=entropy',
        tags: ['Figma', 'Web Design', 'Government Portal', 'Business Process'],
        figma: 'https://www.figma.com/design/vdCDT9ndENo62S8yjRSlB2/Untitled?t=ymiUPtNTHIlNFuEd-1',
        gradient: 'from-indigo-500 to-blue-600'
      },
      {
        id: 15,
        title: 'Ocean Books E-Library Design',
        description: 'Complete digital library platform design including user personas, wireframes, prototypes, user flow diagrams, and comprehensive design system for enhanced reading experience.',
        category: 'UI/UX',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop&crop=entropy',
        tags: ['Figma', 'Library Design', 'User Research', 'Design System', 'Prototyping'],
        figma: 'https://www.figma.com/design/Xu4ii6ZTzv0d1heXItIZhP/14382444_COCOBSCCOMP231P031_NIB203CR_CW?node-id=0-1&t=lJO8AdEZRWiy4LtH-1',
        gradient: 'from-teal-500 to-cyan-600'
      }
    ]
  
    const filteredProjects = activeTab === 'All' 
      ? projects 
      : projects.filter(project => project.category === activeTab)
  
    return (
      <section id="projects" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-gray-800">My</span> <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore my portfolio of web applications, mobile apps, and UI/UX designs
            </p>
          </div>
  
          {/* Category Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-white rounded-full p-2 shadow-lg border border-gray-200 flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 md:px-6 py-3 rounded-full font-medium transition-all duration-300 text-sm md:text-base ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
  
          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-0`}></div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>
  
                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                    {project.description}
                  </p>
  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium hover:bg-purple-100 hover:text-purple-700 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        +{project.tags.length - 4} more
                      </span>
                    )}
                  </div>
  
                  {/* Action Buttons */}
                  <div className="flex gap-3 flex-wrap">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                      >
                        <Github size={16} />
                        <span>Code</span>
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-sm"
                      >
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.figma && (
                      <a
                        href={project.figma}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all text-sm"
                      >
                        <Figma size={16} />
                        <span>Figma</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
  
          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No projects found</h3>
              <p className="text-gray-600">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>
    )
  }
  


// Footer component with social media links
const Footer = () => {
    const socialLinks = [
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/nisal-madura/',
        icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg',
        gradient: 'from-blue-600 to-blue-400',
        hoverColor: 'hover:shadow-blue-500/25'
      },
      {
        name: 'GitHub',
        url: 'https://github.com/NisalMadura',
        icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg',
        gradient: 'from-gray-800 to-gray-600',
        hoverColor: 'hover:shadow-gray-500/25'
      },
      {
        name: 'Facebook',
        url: 'https://www.facebook.com/nisal.perera.146069',
        icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/facebook.svg',
        gradient: 'from-blue-600 to-blue-800',
        hoverColor: 'hover:shadow-blue-600/25'
      },
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/nisal_madura_perera?igsh=eHNiY2dqbTBrZ2xt',
        icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg',
        gradient: 'from-pink-500 via-red-500 to-yellow-500',
        hoverColor: 'hover:shadow-pink-500/25'
      }
    ]
  
    return (
        <footer id="socialLinks" className="py-16 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent mb-4">
                Let's Connect
              </h3>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Ready to start your next project? Let's build something amazing together. 
                Connect with me on social media or reach out directly!
              </p>
            </motion.div>
  
            {/* Social Media Icons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center items-center gap-6 mb-8"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-14 h-14 bg-gradient-to-r ${social.gradient} rounded-full flex items-center justify-center text-white shadow-lg ${social.hoverColor} transition-all duration-300 relative group`}
                  title={social.name}
                >
                  <img 
                    src={social.icon} 
                    alt={social.name}
                    className="w-7 h-7 filter brightness-0 invert"
                  />
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                    {social.name}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
  
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 mb-12"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-white mb-1">Email</h4>
                <p className="text-gray-400">nisalperera619@gmail.com</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-white mb-1">Location</h4>
                <p className="text-gray-400">Kalutara, Sri Lanka</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-white mb-1">Availability</h4>
                <p className="text-gray-400">Open for projects</p>
              </div>
            </motion.div>
          </div>
  
          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="border-t border-gray-700 mb-8"
          />
  
          {/* Bottom Footer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center"
          >
            <div className="flex items-center mb-4 md:mb-0">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent mr-4"
              >
                NP
              </motion.div>
              <p className="text-gray-400">
                © 2025 Nisal Perera. All rights reserved.
              </p>
            </div>
            
            <div className="flex space-x-6 text-sm text-gray-400">
              <motion.a
                href="#"
                whileHover={{ color: '#06b6d4' }}
                className="hover:text-cyan-400 transition-colors"
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ color: '#06b6d4' }}
                className="hover:text-cyan-400 transition-colors"
              >
                Terms of Service
              </motion.a>
            </div>
          </motion.div>
        </div>
      </footer>
    )
  }
// AI Chatbot Component
const AIChatbot = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
      {
        id: 1,
        text: "Hi! I'm Nisal's AI assistant. Feel free to ask me about his skills, projects, or experience!",
        isBot: true,
        timestamp: new Date()
      }
    ])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
      scrollToBottom()
    }, [messages])

    const predefinedResponses = {
      skills: "Nisal is proficient in full-stack development with expertise in React, Node.js, Python, Java, C#, and various databases like MySQL, MongoDB. He also has experience with cloud platforms like AWS, Google Cloud, and Azure.",
      projects: "Nisal has worked on diverse projects including a Sri Lanka Railway Tracking System, CampLanka iOS app, Weather Web App, Gym Management System, and various UI/UX designs. Check out the Projects section for more details!",
      experience: "Nisal has 6 months of professional experience as a Full Stack Developer at the Board of Investment (BOI) Sri Lanka, where he developed enterprise-level applications and approval systems.",
      education: "Nisal is pursuing a BSc (Hons) in Computing with a specialization in Software Engineering. He's passionate about continuous learning and staying updated with latest technologies.",
      contact: "You can reach Nisal through his social media links below or check out his GitHub for more projects. He's always open to discussing new opportunities and collaborations!",
      technologies: "Nisal works with modern tech stack including React, Next.js, Node.js, Express.js, Python, Java, C#, MySQL, MongoDB, Firebase, AWS, Docker, and many more. He's always learning new technologies!",
      mobile: "Nisal has experience in mobile development, particularly iOS development using Swift and SwiftUI. He's built several mobile applications including CampLanka and Square Game.",
      web: "Nisal specializes in modern web development using React, Next.js, Node.js, and various other frameworks. He focuses on creating responsive, user-friendly applications with clean code.",
      uiux: "Nisal has strong UI/UX design skills using Figma. He's designed several mobile and web applications with focus on user experience and modern design principles."
    }

    const getBotResponse = (userMessage) => {
      const lowerMessage = userMessage.toLowerCase()
      
      if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech')) {
        return predefinedResponses.skills
      } else if (lowerMessage.includes('project')) {
        return predefinedResponses.projects
      } else if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
        return predefinedResponses.experience
      } else if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('degree')) {
        return predefinedResponses.education
      } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email')) {
        return predefinedResponses.contact
      } else if (lowerMessage.includes('mobile') || lowerMessage.includes('ios') || lowerMessage.includes('app')) {
        return predefinedResponses.mobile
      } else if (lowerMessage.includes('web') || lowerMessage.includes('website') || lowerMessage.includes('frontend') || lowerMessage.includes('backend')) {
        return predefinedResponses.web
      } else if (lowerMessage.includes('design') || lowerMessage.includes('ui') || lowerMessage.includes('ux') || lowerMessage.includes('figma')) {
        return predefinedResponses.uiux
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return "Hello! I'm here to help you learn more about Nisal. You can ask me about his skills, projects, experience, or anything else you'd like to know!"
      } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
        return "You're welcome! Feel free to ask me anything else about Nisal's work or background."
      } else {
        return "I'd be happy to help! You can ask me about Nisal's skills, projects, experience, education, or how to contact him. What would you like to know?"
      }
    }

    const handleSendMessage = async () => {
      if (!inputValue.trim()) return

      const userMessage = {
        id: messages.length + 1,
        text: inputValue,
        isBot: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, userMessage])
      setInputValue('')
      setIsTyping(true)

      // Simulate typing delay
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: getBotResponse(inputValue),
          isBot: true,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botResponse])
        setIsTyping(false)
      }, 1000 + Math.random() * 1000)
    }

    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSendMessage()
      }
    }

    return (
      <>
        {/* Chatbot Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
          {!isOpen && (
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
          )}
        </motion.button>

        {/* Chatbot Window */}
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={isOpen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 100, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={`fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-40 border border-gray-200 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI Assistant</h3>
                  <p className="text-white/80 text-sm">Ask me about Nisal!</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 h-80 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-xs px-4 py-2 rounded-2xl ${
                  message.isBot 
                    ? 'bg-white text-gray-800 shadow-sm border' 
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                }`}>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="mb-4 flex justify-start">
                <div className="bg-white text-gray-800 shadow-sm border px-4 py-2 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-gray-600 rounded-b-2xl">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about Nisal..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </>
    )
  }
// Scroll progress indicator
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-cyan-400 transform-origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  )
}

// Main component
export default function ModernPortfolio() {
  return (
    <div className="relative">
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <AIChatbot/>
      <Footer />
    </div>
  )
}