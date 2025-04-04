<template>
    <section id="support" class="w-full py-20 bg-gradient-to-b from-[#11151b] to-[#030303]">
        <div class="max-w-2xl mx-auto px-4 md:px-8">
            <div class="text-center mb-12">
                <h2
                    class="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent">
                    Get Support
                </h2>
                <p class="text-neutral-300 max-w-md mx-auto">
                    Need help with your bets or analysis? Our support team is here to assist you 24/7.
                </p>
            </div>

            <form class="support-form bg-sky-900/20 rounded-xl p-6 md:p-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label class="block text-sky-300 text-sm mb-2">Your Name</label>
                        <input type="text"
                            class="w-full bg-sky-900/30 border border-sky-800 rounded-lg py-3 px-4 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-sky-500">
                    </div>
                    <div>
                        <label class="block text-sky-300 text-sm mb-2">Email Address</label>
                        <input type="email"
                            class="w-full bg-sky-900/30 border border-sky-800 rounded-lg py-3 px-4 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-sky-500">
                    </div>
                </div>

                <div class="mb-6">
                    <label class="block text-sky-300 text-sm mb-2">Subject</label>
                    <input type="text"
                        class="w-full bg-sky-900/30 border border-sky-800 rounded-lg py-3 px-4 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-sky-500">
                </div>

                <div class="mb-6">
                    <label class="block text-sky-300 text-sm mb-2">How can we help?</label>
                    <select
                        class="w-full bg-sky-900/30 border border-sky-800 rounded-lg py-3 px-4 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-sky-500">
                        <option value="" class="bg-sky-950 text-neutral-200">Select an option</option>
                        <option class="bg-sky-950 text-neutral-200">Bet Analysis Help</option>
                        <option class="bg-sky-950 text-neutral-200">Account Support</option>
                        <option class="bg-sky-950 text-neutral-200">Feature Request</option>
                        <option class="bg-sky-950 text-neutral-200">Technical Issue</option>
                    </select>
                </div>

                <div class="mb-8">
                    <label class="block text-sky-300 text-sm mb-2">Message</label>
                    <textarea rows="4"
                        class="w-full bg-sky-900/30 border border-sky-800 rounded-lg py-3 px-4 text-neutral-200 focus:outline-none focus:ring-2 focus:ring-sky-500"></textarea>
                </div>

                <div class="flex items-center mb-6">
                    <label class="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" class="hidden">
                        <div class="w-5 h-5 border-2 border-gray-400 rounded-md flex items-center justify-center transition-colors
                        group-hover:border-sky-500 peer-checked:bg-sky-600 peer-checked:border-sky-600">
                            <v-icon name="hi-check" class=" check-mark transition-opacity text-neutral-200  opacity-0"
                                scale="1"></v-icon>
                        </div>
                        <span class="text-sm text-sky-300">Subscribe to betting insights newsletter</span>
                    </label>
                </div>

                <button type="submit"
                    class="w-full py-3 px-6 flex items-center justify-center gap-2 bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 transition-colors duration-300">
                    Send Message
                    <span>

                        <v-icon name="io-send" class=" mt-1" scale="1"></v-icon>
                    </span>
                </button>
            </form>
        </div>
    </section>
</template>

<style>
.support-form {
    transition: all 0.3s ease;
    box-shadow: 0 4px 6px rgba(8, 145, 178, 0.05);
}

.support-form:hover {
    box-shadow: 0 8px 12px rgba(8, 145, 178, 0.1);
    transform: translateY(-2px);
}

input,
select,
textarea {
    transition: all 0.2s ease;
}

select {
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1em;
}

select:focus {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230ea5e9' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
}

input:checked+div {
    background-color: #0284c7;
    border-color: #0284c7;
}

input:checked+div .check-mark {
    opacity: 1;
}

input:hover,
select:hover,
textarea:hover {
    border-color: #0ea5e9;
}

input:focus,
select:focus,
textarea:focus {
    border-color: #0ea5e9;
    box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.2);
}

@media (max-width: 768px) {
    .support-form {
        margin-top: 2rem;
    }
}
</style>