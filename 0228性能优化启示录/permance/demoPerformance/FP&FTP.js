//window.performance.getEntriesByType("paint")
        const obsever = new PerformanceObserver((list)=>{
            for(const entry of list.getEntries()){
                console.log(entry.entryType);
                console.log(entry.startTime);
                console.log(entry.duration);
            }
        })

        obsever.observe({entryTypes:['paint']});