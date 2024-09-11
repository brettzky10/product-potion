import clsx from 'clsx'
import React from 'react'

type Props = { selected: boolean }

function Potion({ selected }: Props) {
  return (
    <svg width="24"
	height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path fillRule="evenodd" clipRule="evenodd" d="M10 9V6.82446C10.2515 6.93762 10.5295 7 10.8198 7H13.1802C13.4705 7 13.7485 6.93762 14 6.82446V9C14 9.55228 14.4477 10 15 10C18.3137 10 21 12.6863 21 16C21 19.3137 18.3137 22 15 22H9C5.68629 22 3 19.3137 3 16C3 12.6863 5.68629 10 9 10C9.55228 10 10 9.55228 10 9ZM16 2H15.7809C15.7832 0.921269 14.9075 0 13.7802 0H10.2198C9.09245 0 8.21684 0.92127 8.21913 2H8C7.44772 2 7 2.44772 7 3C7 3.55228 7.44772 4 8 4V8.06189C4.05369 8.55399 1 11.9204 1 16C1 20.4183 4.58172 24 9 24H15C19.4183 24 23 20.4183 23 16C23 11.9204 19.9463 8.55399 16 8.06189V4C16.5523 4 17 3.55228 17 3C17 2.44772 16.5523 2 16 2ZM10.2198 2L10.8198 5L13.1802 5L13.7802 2H10.2198ZM15.5 14.4999C14.4117 14.5668 13.3536 14.1606 12.2932 13.7535C11.371 13.3995 10.4471 13.0448 9.5 13C7.89583 12.9239 6.20559 13.609 5.17036 14.129C4.51271 14.4593 4.03027 15.0786 4.00339 15.814C4.00114 15.8757 4 15.9377 4 15.9999C4 18.7613 6.23858 20.9999 9 20.9999H15C17.7614 20.9999 20 18.7613 20 15.9999C20 15.6347 19.9608 15.2786 19.8865 14.9357C19.6683 13.9292 18.4938 13.6409 17.5283 13.9993C16.8742 14.2421 16.1303 14.4612 15.5 14.4999ZM9 16.5C9 17.3284 8.32843 18 7.5 18C6.67157 18 6 17.3284 6 16.5C6 15.6715 6.67157 15 7.5 15C8.32843 15 9 15.6715 9 16.5ZM12.5 19.75C13.1904 19.75 13.75 19.1903 13.75 18.5C13.75 17.8096 13.1904 17.25 12.5 17.25C11.8096 17.25 11.25 17.8096 11.25 18.5C11.25 19.1903 11.8096 19.75 12.5 19.75ZM17 17C17 17.5522 16.5523 18 16 18C15.4477 18 15 17.5522 15 17C15 16.4477 15.4477 16 16 16C16.5523 16 17 16.4477 17 17Z" fill="#000000" className={clsx(
				'dark:group-hover:fill-[#9F54FF] transition-all dark:fill-[#C0BFC4] fill-[#5B5966] group-hover:fill-[#BD8AFF] ',
				{ 'dark:!fill-[#7540A9] fill-[#BD8AFF] ': selected }
			  )}
		/>
		</svg>
  )
}

export default Potion