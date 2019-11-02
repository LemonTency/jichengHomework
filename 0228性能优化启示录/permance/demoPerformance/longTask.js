const obsever = new PerformanceObserver((list)=>{
    for(const entry of list.getEntries()){
        console.log(entry.entryType);
        console.log(entry.startTime);
        console.log(entry.duration);
        console.log(JSON.stringify(entry.attribution))
    }
})

obsever.observe({entryTypes:['longtask']});