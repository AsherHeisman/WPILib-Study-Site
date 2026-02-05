const topics = [
  {
    id: "what-is-command-based",
    title: "What Is Command-Based Programming?",
    tagline: "A declarative robot programming pattern built around commands and subsystems.",
    minutes: "10 min",
    summary:
      "WPILib's command-based framework is a declarative way to structure robot code. You describe behaviors as commands that operate on subsystems, and the CommandScheduler manages when commands run and how they share resources. Commands can also be composed into larger behaviors.",
    keyPoints: [
      "Command-based revolves around commands and subsystems.",
      "Commands are scheduled and run by the CommandScheduler singleton.",
      "Subsystem requirements provide automatic resource management so only one command controls a subsystem at a time.",
      "Commands can be composed to build complex behaviors from simpler actions."
    ],
    pitfalls: [
      "Forgetting to call CommandScheduler.run in robotPeriodic so commands never execute.",
      "Leaving out subsystem requirements, which leads to conflicting control.",
      "Putting control logic in periodic methods instead of commands."
    ],
    practice: [
      "List your robot's subsystems and describe the hardware each encapsulates.",
      "Write a trigger map for driver controls and note which commands they schedule.",
      "Sketch a command composition for an autonomous routine."
    ],
    flashcards: [
      { q: "What are the two core abstractions of command-based programming?", a: "Commands and subsystems." },
      { q: "Who is responsible for running and scheduling commands?", a: "The CommandScheduler singleton." },
      { q: "Why is command-based considered declarative?", a: "You declare triggers and behaviors, and the scheduler handles execution." },
      { q: "How are resource conflicts handled?", a: "Commands declare subsystem requirements; the scheduler enforces exclusivity." }
    ],
    quiz: [
      {
        question: "Command-based in WPILib is best described as:",
        choices: [
          "A low-level hardware API with no structure",
          "A design pattern built around commands and subsystems",
          "A single threaded event loop without scheduling",
          "A purely autonomous framework"
        ],
        answer: 1,
        explanation: "WPILib describes command-based as a design pattern built around commands and subsystems."
      },
      {
        question: "Where is CommandScheduler.run typically called?",
        choices: ["autonomousInit", "robotPeriodic", "teleopInit", "disabledPeriodic"],
        answer: 1,
        explanation: "The scheduler is normally invoked from robotPeriodic so it runs every cycle."
      },
      {
        question: "Subsystem requirements are used to:",
        choices: [
          "Schedule commands faster",
          "Prevent multiple commands from controlling the same subsystem simultaneously",
          "Disable periodic methods",
          "Allocate extra threads"
        ],
        answer: 1,
        explanation: "Requirements enforce resource management so only one command uses a subsystem at a time."
      },
      {
        question: "Why use command compositions?",
        choices: [
          "To bypass the scheduler",
          "To bundle commands into larger behaviors",
          "To remove the need for subsystems",
          "To avoid writing triggers"
        ],
        answer: 1,
        explanation: "Compositions let you build complex behaviors from smaller commands."
      }
    ],
    sources: [
      { label: "What is Command-Based Programming?", url: "https://docs.wpilib.org/en/stable/docs/software/commandbased/what-is-command-based.html" }
    ]
  },
  {
    id: "commands",
    title: "Commands",
    tagline: "Actions with a clear lifecycle: initialize, execute, end, finish.",
    minutes: "12 min",
    summary:
      "Commands represent robot actions. They have a lifecycle: initialize runs once when scheduled, execute runs repeatedly while scheduled, end runs once when the command finishes or is interrupted, and isFinished tells the scheduler when the command is complete.",
    keyPoints: [
      "initialize runs once when the command is scheduled.",
      "execute runs repeatedly while the command remains scheduled.",
      "end runs once when the command finishes or is interrupted.",
      "isFinished returns true when the command should end."
    ],
    pitfalls: [
      "Leaving isFinished false for commands that should end.",
      "Creating side effects in constructors instead of initialize.",
      "Forgetting to declare subsystem requirements."
    ],
    practice: [
      "Write a command outline with initialize, execute, end, and isFinished.",
      "Decide which subsystems the command should require.",
      "Add a completion condition that makes sense for the action."
    ],
    flashcards: [
      { q: "Which method runs once when a command is scheduled?", a: "initialize." },
      { q: "Which method runs repeatedly while a command is scheduled?", a: "execute." },
      { q: "Which method decides when the command finishes?", a: "isFinished." },
      { q: "When does end run?", a: "Once when the command finishes or is interrupted." }
    ],
    quiz: [
      {
        question: "Which lifecycle method runs repeatedly?",
        choices: ["initialize", "execute", "end", "isFinished"],
        answer: 1,
        explanation: "execute is called repeatedly while the command is scheduled."
      },
      {
        question: "What causes end to run?",
        choices: [
          "The command is scheduled",
          "The command is finished or interrupted",
          "The robot is disabled",
          "A trigger is pressed"
        ],
        answer: 1,
        explanation: "end is called once when the command ends or is interrupted."
      },
      {
        question: "What should isFinished return when a command is complete?",
        choices: ["true", "false", "null", "It is ignored"],
        answer: 0,
        explanation: "isFinished returning true tells the scheduler to end the command."
      }
    ],
    sources: [
      { label: "Commands", url: "https://docs.wpilib.org/en/stable/docs/software/commandbased/commands.html" }
    ]
  },
  {
    id: "command-compositions",
    title: "Command Compositions",
    tagline: "Build bigger behaviors from smaller commands.",
    minutes: "14 min",
    summary:
      "Command compositions allow you to combine commands into sequences or parallel behaviors. Compositions are commands themselves and can be composed further. Once a command is used in a composition, it should not be scheduled separately.",
    keyPoints: [
      "Compositions are commands and can be nested.",
      "Common composition types include sequence, parallel, race, and deadline.",
      "Decorator-style methods like andThen or alongWith create compositions.",
      "Commands passed into compositions should not be reused elsewhere."
    ],
    pitfalls: [
      "Reusing a command instance after adding it to a composition.",
      "Scheduling commands with conflicting subsystem requirements in parallel.",
      "Mixing blocking logic inside composed commands."
    ],
    practice: [
      "Draft a sequence group for a simple autonomous routine.",
      "Convert a sequence into a parallel + deadline group to overlap actions.",
      "Check that each composed command declares its requirements."
    ],
    flashcards: [
      { q: "What is a command composition?", a: "A command built by combining other commands." },
      { q: "Name a composition type that ends when any command finishes.", a: "Race group." },
      { q: "Which composition keeps a deadline command running to completion?", a: "Deadline group." },
      { q: "Can a command be reused after being placed in a composition?", a: "No, it should not be scheduled separately." }
    ],
    quiz: [
      {
        question: "Which composition type ends when any command finishes?",
        choices: ["Sequence", "Parallel", "Race", "Deadline"],
        answer: 2,
        explanation: "Race groups end when any command ends."
      },
      {
        question: "Which composition guarantees a specific command runs to completion?",
        choices: ["Parallel", "Deadline", "Race", "Sequence"],
        answer: 1,
        explanation: "Deadline groups finish when the deadline command finishes."
      },
      {
        question: "What is true about compositions?",
        choices: [
          "They are not commands",
          "They can be composed recursively",
          "They bypass the scheduler",
          "They require threads"
        ],
        answer: 1,
        explanation: "Compositions are commands and can be nested."
      }
    ],
    sources: [
      { label: "Command Compositions", url: "https://docs.wpilib.org/en/stable/docs/software/commandbased/command-compositions.html" }
    ]
  },
  {
    id: "subsystems",
    title: "Subsystems",
    tagline: "Hardware-focused building blocks with clear ownership.",
    minutes: "10 min",
    summary:
      "Subsystems are the basic organizational unit for robot hardware. They encapsulate sensors and actuators, hide implementation details, and enable the scheduler to manage resource conflicts by tracking subsystem requirements.",
    keyPoints: [
      "Subsystems represent independent hardware collections.",
      "They encapsulate complexity behind a clean interface.",
      "Commands declare subsystem requirements for resource management.",
      "Subsystem periodic methods run as part of the scheduler loop."
    ],
    pitfalls: [
      "Mixing operator control logic into subsystem periodic methods.",
      "Exposing raw hardware state instead of clean methods.",
      "Failing to set a default command where continuous control is needed."
    ],
    practice: [
      "Create a subsystem interface that exposes intent, not raw motor values.",
      "Identify which commands should require each subsystem.",
      "Define a default command for a drive subsystem."
    ],
    flashcards: [
      { q: "What does a subsystem represent?", a: "A coherent collection of hardware and its control logic." },
      { q: "Why do commands declare subsystem requirements?", a: "To let the scheduler manage resource conflicts." },
      { q: "Where should hardware details live?", a: "Inside the subsystem, behind a clean interface." },
      { q: "How often does subsystem periodic run?", a: "Each scheduler iteration." }
    ],
    quiz: [
      {
        question: "Subsystems are primarily used to:",
        choices: [
          "Store game data",
          "Encapsulate hardware and provide resource management",
          "Replace the scheduler",
          "Handle operator input directly"
        ],
        answer: 1,
        explanation: "Subsystems group hardware and enable resource management."
      },
      {
        question: "Why set a default command?",
        choices: [
          "To bypass triggers",
          "To provide continuous behavior when no other command is scheduled",
          "To disable the subsystem",
          "To make the scheduler faster"
        ],
        answer: 1,
        explanation: "Default commands run when the subsystem is idle."
      },
      {
        question: "Where should a sensor be read?",
        choices: [
          "Directly in the trigger binding",
          "In the subsystem",
          "In RobotContainer only",
          "Only in autonomous"
        ],
        answer: 1,
        explanation: "Subsystems should encapsulate hardware access."
      }
    ],
    sources: [
      { label: "Subsystems", url: "https://docs.wpilib.org/en/stable/docs/software/commandbased/subsystems.html" }
    ]
  },
  {
    id: "binding-triggers",
    title: "Binding Commands to Triggers",
    tagline: "Declarative input mapping with Trigger bindings.",
    minutes: "12 min",
    summary:
      "Trigger bindings are declarative: you set them once during initialization and let the framework schedule commands as triggers change. The Trigger class offers methods like onTrue, whileTrue, and toggleOnTrue to control how commands are scheduled.",
    keyPoints: [
      "Bindings are created once during robot initialization.",
      "Trigger provides methods like onTrue, whileTrue, and toggleOnTrue.",
      "Bindings schedule commands based on trigger state changes.",
      "Trigger logic can be composed for complex conditions."
    ],
    pitfalls: [
      "Creating bindings inside periodic loops.",
      "Using whileTrue for commands that should only start once.",
      "Forgetting to debounce noisy inputs."
    ],
    practice: [
      "Create a trigger that activates when a button is held and schedules a command with whileTrue.",
      "Compose two triggers with AND to guard a command.",
      "Add a toggle binding for a subsystem mode."
    ],
    flashcards: [
      { q: "Are trigger bindings declarative or imperative?", a: "Declarative." },
      { q: "Which method schedules a command while the trigger is true and cancels on false?", a: "whileTrue." },
      { q: "Which method schedules a command on a rising edge?", a: "onTrue." },
      { q: "Which method toggles a command each time the trigger goes true?", a: "toggleOnTrue." }
    ],
    quiz: [
      {
        question: "Where should trigger bindings be declared?",
        choices: [
          "Inside robotPeriodic",
          "During initialization, typically in RobotContainer",
          "Inside execute",
          "Inside end"
        ],
        answer: 1,
        explanation: "Bindings are intended to be declared once during initialization."
      },
      {
        question: "Which binding keeps a command scheduled while a trigger is true?",
        choices: ["onTrue", "toggleOnTrue", "whileTrue", "onFalse"],
        answer: 2,
        explanation: "whileTrue schedules the command while the trigger is active."
      },
      {
        question: "What happens with toggleOnTrue?",
        choices: [
          "Command runs once",
          "Command is scheduled while the trigger is held",
          "Command toggles on each rising edge",
          "Command is canceled on falling edge only"
        ],
        answer: 2,
        explanation: "toggleOnTrue toggles the scheduled state each time the trigger becomes true."
      }
    ],
    sources: [
      { label: "Binding Commands to Triggers", url: "https://docs.wpilib.org/en/stable/docs/software/commandbased/binding-commands-to-triggers.html" }
    ]
  },
  {
    id: "structuring-project",
    title: "Structuring a Command-Based Robot Project",
    tagline: "Recommended project layout for commands and subsystems.",
    minutes: "12 min",
    summary:
      "WPILib's command-based template provides a standard layout with Main (Java), Robot, RobotContainer, and Constants, plus Commands and Subsystems directories. RobotContainer is the primary place to declare subsystems, create commands, and bind triggers.",
    keyPoints: [
      "Main (Java), Robot, RobotContainer, and Constants form the top-level structure.",
      "Commands and Subsystems are kept in dedicated directories.",
      "RobotContainer owns subsystems and command bindings.",
      "Robot calls the CommandScheduler from robotPeriodic."
    ],
    pitfalls: [
      "Packing setup logic into Robot instead of RobotContainer.",
      "Scattering constants across files instead of using Constants.",
      "Creating subsystems in multiple places."
    ],
    practice: [
      "Move all bindings into RobotContainer.",
      "Create a Constants class for CAN IDs and tunables.",
      "Split commands into logical packages."
    ],
    flashcards: [
      { q: "Where are subsystems and bindings typically created?", a: "RobotContainer." },
      { q: "Which class is the main robot lifecycle entry point?", a: "Robot." },
      { q: "Where should constants live?", a: "The Constants class or file." },
      { q: "What directories hold most commands and subsystems?", a: "Commands and Subsystems." }
    ],
    quiz: [
      {
        question: "Which file is intended to centralize subsystems and bindings?",
        choices: ["Robot", "RobotContainer", "Main", "Constants"],
        answer: 1,
        explanation: "RobotContainer is meant to hold subsystems, commands, and bindings."
      },
      {
        question: "Where is CommandScheduler.run typically called?",
        choices: ["RobotContainer", "Robot", "Subsystems", "Constants"],
        answer: 1,
        explanation: "The template calls the scheduler from robotPeriodic in Robot."
      },
      {
        question: "Commands should live primarily in:",
        choices: ["Robot", "Subsystems", "Commands", "Main"],
        answer: 2,
        explanation: "Command classes are organized in the Commands directory."
      }
    ],
    sources: [
      { label: "Structuring a Command-Based Project", url: "https://docs.wpilib.org/en/stable/docs/software/commandbased/structuring-command-based-project.html" }
    ]
  },
  {
    id: "organizing-projects",
    title: "Organizing Command-Based Robot Projects",
    tagline: "Keeping large robot codebases intuitive and manageable.",
    minutes: "10 min",
    summary:
      "WPILib emphasizes that good organization makes code intuitive and maintainable, while poor organization makes changes risky and confusing. Inline command helpers like StartEndCommand are handy, but recurring use should be wrapped with factory methods for reuse.",
    keyPoints: [
      "Good organization yields intuitive structure and minimal boilerplate.",
      "Bad organization creates confusing dependencies and brittle changes.",
      "Inline commands like StartEndCommand are useful for one-offs.",
      "Factory methods help reuse inline command patterns."
    ],
    pitfalls: [
      "Letting a single file grow without structure.",
      "Spreading constants across unrelated files.",
      "Repeating StartEndCommand definitions in multiple places."
    ],
    practice: [
      "Audit your command list and find repeated inline commands.",
      "Create a factory method for any repeated inline command.",
      "Document ownership of each subsystem to reduce overlap."
    ],
    flashcards: [
      { q: "What is a sign of good organization?", a: "Code is intuitive, minimal, and easy to modify." },
      { q: "When should you replace repeated StartEndCommand usage?", a: "When it appears multiple times; use a factory method." },
      { q: "Why centralize constants?", a: "To avoid scattered magic values." },
      { q: "What does poor organization lead to?", a: "Confusing structure and risky changes." }
    ],
    quiz: [
      {
        question: "What is a recommended response to repeated inline commands?",
        choices: [
          "Copy them everywhere",
          "Create a factory method",
          "Move them into Robot",
          "Avoid commands entirely"
        ],
        answer: 1,
        explanation: "The docs suggest using factory methods when inline commands are reused."
      },
      {
        question: "Good organization helps with:",
        choices: [
          "Adding hidden side effects",
          "Intuitive structure and collaboration",
          "Removing subsystems",
          "Increasing compile time"
        ],
        answer: 1,
        explanation: "Good organization makes code intuitive and easier to work with."
      },
      {
        question: "StartEndCommand is best for:",
        choices: [
          "One-off commands",
          "Large complex subsystems",
          "Replacing the scheduler",
          "Networking"
        ],
        answer: 0,
        explanation: "StartEndCommand is designed for simple inline commands."
      }
    ],
    sources: [
      { label: "Organizing Command-Based Robot Projects", url: "https://docs.wpilib.org/en/stable/docs/software/commandbased/organizing-command-based.html" }
    ]
  },
  {
    id: "command-scheduler",
    title: "The Command Scheduler",
    tagline: "The engine that runs commands and subsystem periodic code.",
    minutes: "10 min",
    summary:
      "CommandScheduler is the singleton that runs the command-based loop. Each iteration, it polls buttons, schedules new commands, runs command code, ends completed commands, and calls subsystem periodic methods. It is typically called from robotPeriodic every 20 ms.",
    keyPoints: [
      "CommandScheduler is a singleton.",
      "Each run polls inputs, schedules commands, and executes command bodies.",
      "It ends finished or interrupted commands automatically.",
      "Subsystem periodic methods run within the scheduler loop."
    ],
    pitfalls: [
      "Calling run from multiple locations.",
      "Scheduling commands manually without considering requirements.",
      "Assuming commands run without the scheduler."
    ],
    practice: [
      "Confirm robotPeriodic calls CommandScheduler.run.",
      "Log scheduler events to observe command lifecycle.",
      "Review your triggers to ensure they schedule commands as expected."
    ],
    flashcards: [
      { q: "What is CommandScheduler?", a: "The singleton that runs command-based execution each cycle." },
      { q: "What does the scheduler do each iteration?", a: "Polls triggers, schedules commands, runs them, and ends finished ones." },
      { q: "Where should run be called?", a: "robotPeriodic." },
      { q: "What else runs in the scheduler loop?", a: "Subsystem periodic methods." }
    ],
    quiz: [
      {
        question: "Which is part of the scheduler loop?",
        choices: [
          "Polling triggers and scheduling commands",
          "Editing source files",
          "Restarting the robot code",
          "Building the project"
        ],
        answer: 0,
        explanation: "The scheduler polls inputs and schedules commands each loop."
      },
      {
        question: "How often does the scheduler typically run?",
        choices: ["Once per match", "Once per second", "Once per 20 ms", "Only in teleop"],
        answer: 2,
        explanation: "The scheduler loop is typically called every 20 ms."
      },
      {
        question: "What happens when a command finishes?",
        choices: [
          "It remains scheduled forever",
          "The scheduler ends it and calls end",
          "Subsystems are disabled",
          "The robot restarts"
        ],
        answer: 1,
        explanation: "Finished commands are ended by the scheduler."
      }
    ],
    sources: [
      { label: "Command Scheduler", url: "https://docs.wpilib.org/en/stable/docs/software/commandbased/command-scheduler.html" }
    ]
  },
  {
    id: "cpp-command-discussion",
    title: "A Technical Discussion on C++ Commands",
    tagline: "Ownership, smart pointers, and the command framework design.",
    minutes: "14 min",
    summary:
      "The C++ command framework evolved from raw-pointer ownership to a smart-pointer model. Unique ownership via std::unique_ptr clarifies who owns a command, while CommandPtr provides a move-only wrapper that supports command decorators and avoids slicing. CRTP via CommandHelper supports decorator patterns.",
    keyPoints: [
      "The old model relied on raw pointers with unclear ownership.",
      "The current framework uses smart pointers to represent ownership.",
      "CommandPtr wraps unique_ptr and enables decorators.",
      "CommandHelper uses CRTP to support decorator syntax."
    ],
    pitfalls: [
      "Copying commands by value instead of moving CommandPtr.",
      "Holding raw pointers without clear ownership.",
      "Mixing ownership models in the same codebase."
    ],
    practice: [
      "Audit your command factories for correct ownership.",
      "Use CommandPtr when returning decorated commands.",
      "Avoid storing commands by value in containers."
    ],
    flashcards: [
      { q: "Why was the old raw-pointer model problematic?", a: "Ownership was unclear, leading to memory leaks." },
      { q: "What does CommandPtr provide?", a: "A move-only wrapper that owns a command and supports decorators." },
      { q: "What smart pointer underlies CommandPtr?", a: "std::unique_ptr." },
      { q: "Which technique enables decorator support?", a: "CRTP via CommandHelper." }
    ],
    quiz: [
      {
        question: "Why introduce CommandPtr?",
        choices: [
          "To enable garbage collection",
          "To support command decorators and avoid slicing",
          "To remove the scheduler",
          "To add threads"
        ],
        answer: 1,
        explanation: "CommandPtr enables decorators with move-only semantics and avoids slicing."
      },
      {
        question: "Which pointer expresses single ownership in the C++ framework?",
        choices: ["shared_ptr", "weak_ptr", "unique_ptr", "raw pointer"],
        answer: 2,
        explanation: "The framework uses std::unique_ptr for single ownership."
      },
      {
        question: "What role does CommandHelper play?",
        choices: [
          "It schedules commands automatically",
          "It provides CRTP support for decorators",
          "It replaces subsystems",
          "It stores game data"
        ],
        answer: 1,
        explanation: "CommandHelper uses CRTP to support decorator syntax."
      }
    ],
    sources: [
      { label: "Technical Discussion on C++ Commands", url: "https://docs.wpilib.org/en/stable/docs/software/commandbased/cpp-command-discussion.html" }
    ]
  },
  {
    id: "pid-control",
    title: "PID Control in Command-Based",
    tagline: "Use PIDSubsystem and PIDCommand wrappers for PIDController.",
    minutes: "12 min",
    summary:
      "WPILib provides PIDSubsystem and PIDCommand as convenience wrappers around PIDController. PIDSubsystem subclasses implement getMeasurement and useOutput, while PIDCommand provides a command-based wrapper for PID control logic.",
    keyPoints: [
      "PIDSubsystem and PIDCommand integrate PIDController into command-based.",
      "PIDSubsystem requires getMeasurement and useOutput implementations.",
      "PIDCommand wraps PID control behavior as a command.",
      "Setpoints and controller configuration live in the PID wrapper."
    ],
    pitfalls: [
      "Overriding periodic without calling the base behavior.",
      "Using inconsistent units for measurements and setpoints.",
      "Forgetting to enable or set a setpoint."
    ],
    practice: [
      "Implement a PIDSubsystem for an arm or elevator.",
      "Tune PID constants in one place and document units.",
      "Add a command that updates the setpoint on a trigger."
    ],
    flashcards: [
      { q: "What do PIDSubsystem and PIDCommand wrap?", a: "PIDController for command-based use." },
      { q: "Which methods must a PIDSubsystem implement?", a: "getMeasurement and useOutput." },
      { q: "What does PIDCommand provide?", a: "A command wrapper around PID control logic." },
      { q: "What must be consistent in PID control?", a: "Units for measurements and setpoints." }
    ],
    quiz: [
      {
        question: "PIDSubsystem is primarily used to:",
        choices: [
          "Wrap PIDController with subsystem structure",
          "Replace the scheduler",
          "Handle trigger bindings",
          "Store constants"
        ],
        answer: 0,
        explanation: "PIDSubsystem is a convenience wrapper around PIDController."
      },
      {
        question: "Which methods are required in PIDSubsystem?",
        choices: ["initialize and execute", "getMeasurement and useOutput", "end and isFinished", "periodic and simulationPeriodic"],
        answer: 1,
        explanation: "PIDSubsystem requires getMeasurement and useOutput implementations."
      },
      {
        question: "PIDCommand is best described as:",
        choices: [
          "A PID loop inside a Subsystem only",
          "A command wrapper for PIDController",
          "A replacement for Triggers",
          "A simulation tool"
        ],
        answer: 1,
        explanation: "PIDCommand wraps PIDController in a command."
      }
    ],
    sources: [
      { label: "PID Control through PIDSubsystem and PIDCommand", url: "https://docs.wpilib.org/en/stable/docs/software/commandbased/pid-subsystems-commands.html" }
    ]
  },
  {
    id: "motion-profiling",
    title: "Motion Profiling in Command-Based",
    tagline: "TrapezoidProfileSubsystem and TrapezoidProfileCommand.",
    minutes: "12 min",
    summary:
      "Motion profiling generates smooth position and velocity setpoints using trapezoidal profiles. WPILib provides TrapezoidProfileSubsystem and TrapezoidProfileCommand wrappers to create and execute profiles within command-based robots.",
    keyPoints: [
      "Trapezoidal profiles generate smooth setpoints.",
      "TrapezoidProfileSubsystem runs profiles inside a subsystem.",
      "TrapezoidProfileCommand wraps profiles as commands.",
      "Profiles are defined by constraints on max velocity and acceleration."
    ],
    pitfalls: [
      "Inconsistent units for position, velocity, and acceleration.",
      "Expecting built-in PID tracking without adding a controller.",
      "Using unrealistic constraints that the mechanism cannot meet."
    ],
    practice: [
      "Define constraints for a drivetrain or arm.",
      "Create a TrapezoidProfileCommand to move between setpoints.",
      "Log the generated setpoints to validate smooth motion."
    ],
    flashcards: [
      { q: "What is a trapezoidal motion profile used for?", a: "Generating smooth position and velocity setpoints." },
      { q: "Which wrapper creates profiles inside a subsystem?", a: "TrapezoidProfileSubsystem." },
      { q: "Which wrapper creates profiles as commands?", a: "TrapezoidProfileCommand." },
      { q: "What defines the profile shape?", a: "Constraints on maximum velocity and acceleration." }
    ],
    quiz: [
      {
        question: "Trapezoidal profiles are used to:",
        choices: [
          "Eliminate the scheduler",
          "Generate smooth motion setpoints",
          "Store robot settings",
          "Read sensors"
        ],
        answer: 1,
        explanation: "Motion profiling generates smooth setpoints."
      },
      {
        question: "Which wrapper integrates profiles into a subsystem?",
        choices: ["PIDSubsystem", "TrapezoidProfileSubsystem", "ProfiledPIDSubsystem", "SequentialCommandGroup"],
        answer: 1,
        explanation: "TrapezoidProfileSubsystem is the motion profile subsystem wrapper."
      },
      {
        question: "What defines a trapezoidal profile?",
        choices: [
          "NetworkTables settings",
          "Max velocity and max acceleration constraints",
          "Motor IDs",
          "Trigger bindings"
        ],
        answer: 1,
        explanation: "Profiles are defined by velocity and acceleration constraints."
      }
    ],
    sources: [
      { label: "Motion Profiling through TrapezoidProfileSubsystems and Commands", url: "https://docs.wpilib.org/en/stable/docs/software/commandbased/profile-subsystems-commands.html" }
    ]
  },
  {
    id: "motion-profiling-pid",
    title: "Combining Motion Profiling and PID in Command-Based",
    tagline: "ProfiledPIDController and its command-based wrappers.",
    minutes: "12 min",
    summary:
      "WPILib's ProfiledPIDController combines trapezoidal motion profile setpoint generation with PID tracking. ProfiledPIDSubsystem and ProfiledPIDCommand provide command-based wrappers for this combined approach.",
    keyPoints: [
      "ProfiledPIDController pairs motion profiling with PID tracking.",
      "ProfiledPIDSubsystem and ProfiledPIDCommand wrap this controller.",
      "Profiles provide smooth setpoints while PID tracks them.",
      "Constraints still define max velocity and acceleration."
    ],
    pitfalls: [
      "Confusing TrapezoidProfileSubsystem with ProfiledPIDSubsystem.",
      "Mixing profile constraints with incorrect units.",
      "Failing to tune PID gains for the profile."
    ],
    practice: [
      "Choose constraints and PID gains for a mechanism.",
      "Implement a ProfiledPIDSubsystem and verify tracking.",
      "Compare with a plain PIDSubsystem to see differences."
    ],
    flashcards: [
      { q: "What does ProfiledPIDController combine?", a: "Trapezoidal motion profiles with PID tracking." },
      { q: "Which wrapper uses ProfiledPIDController in a subsystem?", a: "ProfiledPIDSubsystem." },
      { q: "What is the benefit of profiling + PID?", a: "Smooth setpoints with closed-loop tracking." },
      { q: "What still defines motion limits?", a: "Constraints on max velocity and acceleration." }
    ],
    quiz: [
      {
        question: "ProfiledPIDController is used to:",
        choices: [
          "Schedule triggers automatically",
          "Combine profiling setpoints with PID tracking",
          "Replace all subsystems",
          "Write NetworkTables"
        ],
        answer: 1,
        explanation: "ProfiledPIDController combines motion profiling with PID tracking."
      },
      {
        question: "Which wrapper should you use for profiling + PID in a command?",
        choices: ["TrapezoidProfileCommand", "PIDCommand", "ProfiledPIDCommand", "InstantCommand"],
        answer: 2,
        explanation: "ProfiledPIDCommand wraps ProfiledPIDController for command-based use."
      },
      {
        question: "What should still be tuned when using ProfiledPIDController?",
        choices: ["Only the profile", "PID gains and constraints", "Nothing", "Trigger bindings"],
        answer: 1,
        explanation: "You still tune PID gains and choose motion constraints."
      }
    ],
    sources: [
      { label: "Combining Motion Profiling and PID", url: "https://docs.wpilib.org/en/stable/docs/software/commandbased/profilepid-subsystems-commands.html" }
    ]
  }
];

const topicCountEl = document.getElementById("topicCount");
const heroStats = document.getElementById("heroStats");
const topicListEl = document.getElementById("topicList");
const topicTitle = document.getElementById("topicTitle");
const topicTagline = document.getElementById("topicTagline");
const topicMeta = document.getElementById("topicMeta");
const topicSummary = document.getElementById("topicSummary");
const topicKeyPoints = document.getElementById("topicKeyPoints");
const topicPitfalls = document.getElementById("topicPitfalls");
const topicPractice = document.getElementById("topicPractice");
const topicSources = document.getElementById("topicSources");
const flashcard = document.getElementById("flashcard");
const cardFront = document.getElementById("cardFront");
const cardBack = document.getElementById("cardBack");
const cardProgress = document.getElementById("cardProgress");
const quizBody = document.getElementById("quizBody");
const quizResult = document.getElementById("quizResult");
const topicSearch = document.getElementById("topicSearch");

const state = {
  topicId: topics[0].id,
  cardIndex: 0,
  cardOrder: [],
  quizSet: []
};

const topicMap = new Map(topics.map((topic) => [topic.id, topic]));

const shuffle = (array) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const renderTopicList = (filter = "") => {
  const filtered = topics.filter((topic) =>
    topic.title.toLowerCase().includes(filter.toLowerCase())
  );
  topicListEl.innerHTML = filtered
    .map(
      (topic) => `
      <button type="button" class="topic-item ${topic.id === state.topicId ? "active" : ""}" data-id="${topic.id}">
        ${topic.title}
        <span>${topic.minutes} - ${topic.flashcards.length} cards - ${topic.quiz.length} questions</span>
      </button>
    `
    )
    .join("");
};

const setHeroStats = () => {
  const totalCards = topics.reduce((sum, topic) => sum + topic.flashcards.length, 0);
  const totalQuestions = topics.reduce((sum, topic) => sum + topic.quiz.length, 0);
  topicCountEl.textContent = `${topics.length} Topics`;
  heroStats.innerHTML = `
    <span>${totalCards} flashcards</span>
    <span>${totalQuestions} quiz questions</span>
    <span>Self-paced study flow</span>
  `;
};

const resetCards = (topic) => {
  state.cardOrder = topic.flashcards.map((_, index) => index);
  state.cardIndex = 0;
  flashcard.classList.remove("flipped");
};

const renderFlashcard = () => {
  const topic = topicMap.get(state.topicId);
  const cardId = state.cardOrder[state.cardIndex];
  const card = topic.flashcards[cardId];
  cardFront.textContent = card.q;
  cardBack.textContent = card.a;
  cardProgress.textContent = `Card ${state.cardIndex + 1} of ${topic.flashcards.length}`;
};

const generateQuiz = () => {
  const topic = topicMap.get(state.topicId);
  const count = Math.min(5, topic.quiz.length);
  state.quizSet = shuffle(topic.quiz).slice(0, count);
  quizBody.innerHTML = state.quizSet
    .map(
      (item, index) => `
        <div class="quiz-question" data-index="${index}">
          <p>${index + 1}. ${item.question}</p>
          <div class="quiz-options">
            ${item.choices
              .map(
                (choice, choiceIndex) => `
                  <label>
                    <input type="radio" name="q${index}" value="${choiceIndex}">
                    ${choice}
                  </label>
                `
              )
              .join("")}
          </div>
          <div class="quiz-explain" aria-live="polite"></div>
        </div>
      `
    )
    .join("");
  quizResult.textContent = "";
};

const renderTopic = (topicId) => {
  const topic = topicMap.get(topicId);
  if (!topic) return;
  state.topicId = topicId;
  topicTitle.textContent = topic.title;
  topicTagline.textContent = topic.tagline;
  topicMeta.textContent = `${topic.minutes} - ${topic.flashcards.length} cards - ${topic.quiz.length} questions`;
  topicSummary.textContent = topic.summary;
  topicKeyPoints.innerHTML = topic.keyPoints.map((point) => `<li>${point}</li>`).join("");
  topicPitfalls.innerHTML = topic.pitfalls.map((point) => `<li>${point}</li>`).join("");
  topicPractice.innerHTML = topic.practice.map((item) => `<li>${item}</li>`).join("");
  topicSources.innerHTML = topic.sources
    .map((source) => `<li><a href="${source.url}" target="_blank" rel="noreferrer">${source.label}</a></li>`)
    .join("");
  resetCards(topic);
  renderFlashcard();
  generateQuiz();
  renderTopicList(topicSearch.value);
};

document.getElementById("prevCard").addEventListener("click", () => {
  const topic = topicMap.get(state.topicId);
  state.cardIndex = (state.cardIndex - 1 + topic.flashcards.length) % topic.flashcards.length;
  flashcard.classList.remove("flipped");
  renderFlashcard();
});

document.getElementById("nextCard").addEventListener("click", () => {
  const topic = topicMap.get(state.topicId);
  state.cardIndex = (state.cardIndex + 1) % topic.flashcards.length;
  flashcard.classList.remove("flipped");
  renderFlashcard();
});

document.getElementById("flipCard").addEventListener("click", () => {
  flashcard.classList.toggle("flipped");
});

document.getElementById("shuffleCards").addEventListener("click", () => {
  state.cardOrder = shuffle(state.cardOrder);
  state.cardIndex = 0;
  flashcard.classList.remove("flipped");
  renderFlashcard();
});

flashcard.addEventListener("click", () => {
  flashcard.classList.toggle("flipped");
});

document.getElementById("newQuiz").addEventListener("click", generateQuiz);

document.getElementById("resetQuiz").addEventListener("click", generateQuiz);

document.getElementById("checkQuiz").addEventListener("click", () => {
  let correct = 0;
  state.quizSet.forEach((item, index) => {
    const block = quizBody.querySelector(`.quiz-question[data-index="${index}"]`);
    const selected = block.querySelector(`input[name="q${index}"]:checked`);
    const explain = block.querySelector(".quiz-explain");
    if (selected && Number(selected.value) === item.answer) {
      block.classList.add("correct");
      block.classList.remove("incorrect");
      correct += 1;
      explain.textContent = `Correct. ${item.explanation}`;
    } else {
      block.classList.add("incorrect");
      block.classList.remove("correct");
      explain.textContent = `Correct answer: ${item.choices[item.answer]}. ${item.explanation}`;
    }
  });
  quizResult.textContent = `Score: ${correct} / ${state.quizSet.length}`;
});

topicListEl.addEventListener("click", (event) => {
  const button = event.target.closest(".topic-item");
  if (!button) return;
  renderTopic(button.dataset.id);
});

topicSearch.addEventListener("input", (event) => {
  renderTopicList(event.target.value);
});

document.getElementById("startStudy").addEventListener("click", () => {
  document.getElementById("app").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("randomTopic").addEventListener("click", () => {
  const choice = topics[Math.floor(Math.random() * topics.length)];
  renderTopic(choice.id);
  document.getElementById("app").scrollIntoView({ behavior: "smooth" });
});

setHeroStats();
renderTopicList();
renderTopic(state.topicId);
