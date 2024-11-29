export const getSceneTimes = (scene) => {
    const [startTime, endTime] = scene.Scene.split('-').map((time) => {
        const [hours, minutes, seconds] = time.trim().split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    })
    return { startTime, endTime };
}