const timeago = (time: string) => {
    const diff = Date.now() - Date.parse(time);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24)); // 일
    const hour = Math.floor((diff / (1000 * 60 * 60)) % 24); // 시
    const minutes = Math.floor((diff / (1000 * 60)) % 60); // 분
    const second = Math.floor((diff / 1000) % 60); // 초
    if (days) {
        return `${days}일 전`;
    } else if (hour) {
        return `${hour}시간 전`;
    } else if (minutes) {
        return `${minutes}분 전`;
    } else if (second) {
        return `${second}초 전`;
    }
};

export default timeago;
