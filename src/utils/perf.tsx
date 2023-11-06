import React from 'react';
import {ProfilerOnRenderCallback, Profiler, useEffect, useRef} from 'react';

export function useRenderCount(componentName: string) {
  const renderCountRef = useRef(0);

  useEffect(() => {
    renderCountRef.current += 1;
    console.log(`${componentName} rendered ${renderCountRef.current} times`);
  });
}

type WithProfilerProps<P> = P & {
  profilerId: string;
};

export function withProfiler<P>(
  WrappedComponent: React.ComponentType<P>,
  profilerId: string,
): React.ComponentType<WithProfilerProps<P>> {
  const ProfilerComponent: React.FC<WithProfilerProps<P>> = props => {
    const onRenderCallback: ProfilerOnRenderCallback = (
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
      interactions,
    ) => {
      // Log the profiler data or handle it as needed
      console.log(`Profiler ID: ${id}`);
      console.log(`Phase: ${phase}`);
      console.log(`Actual duration: ${actualDuration}`);
      console.log(`Base duration: ${baseDuration}`);
      console.log(`Start time: ${startTime}`);
      console.log(`Commit time: ${commitTime}`);
      console.log('Interactions:', interactions);
    };

    return (
      <Profiler id={profilerId} onRender={onRenderCallback}>
        <WrappedComponent {...props} />
      </Profiler>
    );
  };

  // Set a display name for the HOC for easier debugging
  const wrappedComponentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  ProfilerComponent.displayName = `withProfiler(${wrappedComponentName})`;

  return ProfilerComponent;
}

const actBusyFor = (milliseconds: number) => {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
};

export function spamBridge() {
  for (var i = 0; i < 1000; i++) {
    initTimer();
  }
}

export function actBusy() {
  setTimeout(() => {
    actBusyFor(8000);
  }, 500);
}

// setTimeout sends a message over MessageQueue.js to trigger the Native "Timing.createTimer()"
function initTimer() {
  setTimeout(function () {
    initTimer();
  }, 1);
}
