import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';

const belts = [
  { name: 'All Belts', value: 'all', color: 'bg-gray-500' },
  { name: 'Blue Belt', value: 'blue', color: 'bg-blue-500' },
  { name: 'Purple Belt', value: 'purple', color: 'bg-purple-500' },
  { name: 'Brown Belt', value: 'brown', color: 'bg-amber-700' },
  { name: 'Black Belt', value: 'black', color: 'bg-black' },
];

export default function BeltSelector({ selected, onChange }) {
  const selectedBelt = belts.find(belt => belt.value === selected) || belts[0];

  return (
    <Listbox value={selected} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="flex items-center">
            <span className={`inline-block h-4 w-4 rounded-full ${selectedBelt.color} mr-2`} />
            <span className="block truncate">{selectedBelt.name}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
            {belts.map((belt) => (
              <Listbox.Option
                key={belt.value}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                  }`
                }
                value={belt.value}
              >
                {({ selected }) => (
                  <>
                    <span className="flex items-center">
                      <span className={`inline-block h-4 w-4 rounded-full ${belt.color} mr-2`} />
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {belt.name}
                      </span>
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
