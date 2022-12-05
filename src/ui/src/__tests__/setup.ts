export const setUpTests = () => {
    jest
        .useFakeTimers()
        .setSystemTime(new Date());
}