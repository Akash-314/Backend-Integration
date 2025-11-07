async function loadHabits() {
  try {
    const response = await fetch("habits.json");
    const data = await response.json();
    displayHabits(data.habits);
  } catch (error) {
    console.error("Error loading habits:", error);
  }
}

function displayHabits(habits) {
  const habitList = document.getElementById("habitList");
  habitList.innerHTML = "";

  habits.forEach((habit, index) => {
    const card = document.createElement("div");
    card.className = "habit-card bg-white p-4 rounded-xl shadow-sm flex flex-col items-center text-center";
    card.innerHTML = `
      <h4 class="font-semibold text-lg mb-2">${habit.name}</h4>
      <p class="text-gray-600 mb-4">${habit.description}</p>
      <button id="habit-${index}" class="toggle-btn px-4 py-2 rounded-md ${
        habit.done ? "bg-green-500 text-white" : "bg-gray-300 text-gray-800"
      }">${habit.done ? "Done ✅" : "Mark as Done"}</button>
    `;

    const button = card.querySelector(`#habit-${index}`);
    button.addEventListener("click", () => toggleHabit(habits, index));

    habitList.appendChild(card);
  });

  updateProgress(habits);
}

function toggleHabit(habits, index) {
  habits[index].done = !habits[index].done;
  displayHabits(habits);
}

function updateProgress(habits) {
  const total = habits.length;
  const completed = habits.filter(h => h.done).length;
  const percentage = Math.round((completed / total) * 100);

  document.getElementById("progressFill").style.width = `${percentage}%`;
  document.getElementById("progressText").textContent = `${percentage}% completed`;
}

loadHabits();
