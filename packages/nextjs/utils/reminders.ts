export function scheduleReminder(linkUrl: string, reminderTime: number) {
  const delay = reminderTime - Date.now();
  if (delay > 0) {
    setTimeout(() => {
      new Notification("Time to read your saved link!", { body: linkUrl });

      // Fun nagging voice
      const utterance = new SpeechSynthesisUtterance(`Hey, remember to read ${linkUrl}. No more hoarding!`);
      speechSynthesis.speak(utterance);
    }, delay);
  }
}
