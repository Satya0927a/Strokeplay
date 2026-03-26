const StatsLine = ()=> {
  const items = [
    { label:"Active Members",  value:"2,400+", color:"#00C46A" },
    { label:"Charities Supported", value:"18",  color:"#00E57A" },
    { label:"Prize Pool This Month", value:"£8,420", color:"#FFB800" },
    { label:"Scores Logged",  value:"14,300+", color:"#00C46A" },
    { label:"Total Donated",  value:"£42,600", color:"#00E57A" },
    { label:"Countries",      value:"7",        color:"#FFB800" },
  ];
  const doubled = [...items, ...items];

  return (
    <div className="border-t border-b py-5 overflow-hidden"
      style={{ background: "rgba(0,196,106,0.04)", borderColor: "rgba(0,196,106,0.1)" }}>
      <div className="ticker-wrap">
        <div className="anim-ticker">
          {doubled.map((item, i) => (
            <div key={i} className="flex items-center gap-3 shrink-0">
              <span className="font-display text-[1.3rem] font-extrabold" style={{ color: item.color }}>{item.value}</span>
              <span className="text-[.8rem] text-white/40 tracking-[.04em] uppercase">{item.label}</span>
              <div className="w-1 h-1 rounded-full bg-white/15 ml-2"/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StatsLine