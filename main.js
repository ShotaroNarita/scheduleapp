class Event {
    constructor(name, begin, end) {
        this.name = name;
        this.begin = new moment(begin);
        this.end = new moment(end);
        this.color = "#456789";
    }

    sandwiched(date) {
        return this.begin <= date && date <= this.end;
    }

    style(date) {
        let rev = "";
        if (this.sandwiched(date)) {
            rev = `background-color: ${this.color};`
        }
        return rev;
    }
}

const app = new Vue({
    el: '#app',
    data: function () {
        return {
            begin: new moment(),
            end: (new moment()).add(5, 'days'),
            events: [],

            new_name: "",
        }
    },

    created: function () {
        const b1 = (new moment()).startOf('day');
        const e1 = b1.clone().add(5, 'days');
        this.events.push(new Event('hello', b1, e1));

        const b2 = b1.clone().add(3, 'days');
        const e2 = b2.clone().add(10, 'days');
        this.events.push(new Event('world', b2, e2));

        this.find_range();
    },

    methods: {
        find_range() {
            const pool = [];

            for (let ev of this.events) {
                pool.push(ev.begin);
                pool.push(ev.end);
            }

            pool.sort((dt1, dt2) => { return dt1 < dt2 ? -1 : 1 });

            return {
                min: pool[0],
                max: pool[pool.length - 1],
            }
        },

        add_event(){
            this.events.push(new Event(this.new_name, new Date(), new Date()));
            this.new_name = "";
        }
    },

    computed: {
        timeaxis: function () {
            const range = this.find_range();
            this.begin = range['min'];
            this.end = range['max'];

            // console.log('+=+=+=+=+=+=+=+=+=')
            // console.log(range);

            // console.log('=========')
            // console.log(this.begin.format('YYYY.MM.DD'))
            // console.log(this.end.format('YYYY.MM.DD'))

            let rev = [];

            let cursor = this.begin.clone();

            while (true) {
                // console.log('cursor: ', cursor.format('YYYY.MM.DD'));
                // console.log('end: ', this.end.format('YYYY.MM.DD'));
                if (this.end <= cursor) break;

                cursor = cursor.add(1, 'days').clone();
                rev.push(cursor);
            }

            return rev;
        }
    }
});

const store = new Vuex.Store({

});