export const Background = () => (
    <>
      <div 
        className="fixed inset-0 z-0 bg-[#0a0a1a]" 
        style={{
          background: `
            radial-gradient(ellipse 80% 80% at 20% 20%, rgba(108, 99, 255, 0.15) 0%, transparent 60%),
            radial-gradient(ellipse 60% 60% at 80% 80%, rgba(167, 139, 250, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse 40% 40% at 50% 50%, rgba(79, 70, 229, 0.08) 0%, transparent 70%),
            #0a0a1a
          `
        }}
      />
      <div 
        className="fixed inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      <div className="fixed top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full opacity-40 blur-[80px] pointer-events-none animate-pulse z-0"
           style={{ background: 'radial-gradient(circle, rgba(108, 99, 255, 0.5) 0%, transparent 70%)' }} />
      <div className="fixed bottom-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full opacity-40 blur-[80px] pointer-events-none animate-pulse z-0"
           style={{ background: 'radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, transparent 70%)', animationDelay: '-4s' }} />
    </>
  );