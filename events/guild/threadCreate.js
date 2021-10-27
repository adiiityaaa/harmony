module.exports.run = async(client, thread) => {
try {
        thread.join()
    } catch (e) {
        return;
    }
}