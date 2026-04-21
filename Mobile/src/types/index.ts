export interface Pattern {
  id: string;
  name: string;
  intentCategory: IntentCategory;
  description: string;
  trigger: string[];
  driver: 'spring' | 'time' | 'gesture' | 'scroll';
  primitives: {
    transform?: string[];
    opacity?: boolean;
    layout?: string[];
    color?: boolean;
  };
  timing: {
    type: 'spring' | 'timed';
    preset: 'snappy' | 'smooth' | 'bouncy';
  };
  choreography: 'parallel' | 'sequence' | 'stagger';
}

export type IntentCategory =
  | 'Screen transition'
  | 'Show / Hide UI'
  | 'Feedback / validation'
  | 'Loading / async'
  | 'Drag / scroll'
  | 'Forms / input';

export type RootStackParamList = {
  MainTabs: undefined;
  Intent: { category: IntentCategory };
  PatternDetail: { patternId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Favorites: undefined;
};
