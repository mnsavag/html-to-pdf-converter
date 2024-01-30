export class PerformanceMeasure {
    start(ramMeasureInterval) {
        this.start = performance.now()
        this.maxRAMConsumption = 0

        this._memUsageInterval = setInterval(() => {
            let memUsage = process.memoryUsage();
            if (memUsage.rss > this.maxRAMConsumption) {
                this.maxRAMConsumption = memUsage.rss
            }
        }, ramMeasureInterval); 
    }

    end() {
        clearInterval(this._memUsageInterval)
    }
}