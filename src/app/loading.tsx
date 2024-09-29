export default function Loading() {
    return (
      <>
        <style>
          {`
                @keyframes spin {
                  0% {
                    transform: rotate(0deg);
                  }
                  50%, 100% { /* Adjust this percentage to control the speed of rotation */
                    transform: rotate(180deg);
                  }
                }
              `}
        </style>
        <div className="flex flex-col items-center justify-center h-screen gap-4">
          <svg fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
    viewBox="0 0 512 512" xmlSpace="preserve"
          className="h-10 w-10 animate-spin ease-linear"
            style={{
              animation: `spin 1.8s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite`,
            }}
    >
            <g>
              <g>
                <path d="M322.783,145.931V33.391h16.696c9.22,0,16.696-7.475,16.696-16.696S348.699,0,339.478,0H172.522
                  c-9.22,0-16.696,7.475-16.696,16.696s7.475,16.696,16.696,16.696h16.696v112.54C117.7,172.912,66.783,241.82,66.783,322.783
                  C66.783,427.284,151.497,512,256,512c104.501,0,189.217-84.716,189.217-189.217C445.217,241.82,394.299,172.912,322.783,145.931z
                  M222.609,170.65v-25.954v-8.011V33.391h66.783v103.294v8.011v25.954c55.374,12.149,99.72,53.829,115.819,107.611H106.79
                  C122.889,224.48,167.235,182.798,222.609,170.65z M255.999,478.609c-85.924,0-155.825-69.902-155.825-155.826
                  c0-3.751,0.227-7.445,0.489-11.13h310.674c0.263,3.685,0.489,7.38,0.489,11.13C411.825,408.706,341.922,478.609,255.999,478.609z"
                  />
              </g>
            </g>
            <g>
              <g>
                <path d="M283.826,345.043c-27.662,0-50.087,22.424-50.087,50.087s22.424,50.087,50.087,50.087
                  c27.662,0,50.087-22.424,50.087-50.087S311.488,345.043,283.826,345.043z M283.826,411.826c-9.207,0-16.696-7.49-16.696-16.696
                  s7.489-16.696,16.696-16.696c9.206,0,16.696,7.49,16.696,16.696S293.032,411.826,283.826,411.826z"/>
              </g>
            </g>
            <g>
              <g>
                <circle cx="183.652" cy="361.739" r="16.696"/>
              </g>
            </g>
            <g>
              <g>
                <circle cx="250.435" cy="228.174" r="16.696"/>
              </g>
            </g>
            </svg>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 w-10 animate-spin ease-linear"
            style={{
              animation: `spin 1.8s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite`,
            }}
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg> */}
          <h1 className="text-3xl font-semibold">Launch Potion</h1>
        </div>
      </>
    );
  }