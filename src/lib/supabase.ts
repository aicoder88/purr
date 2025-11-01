// Dummy Supabase client implementation
// This file provides a mock implementation that doesn't require actual Supabase credentials

export const supabase = {
  // Auth methods
  auth: {
    signIn: () => Promise.resolve({ user: null, session: null, error: null }),
    signOut: () => Promise.resolve({ error: null }),
    session: () => null,
  },
  
  // Database methods
  from: () => ({
    select: () => ({
      eq: () => ({
        data: [],
        error: null,
      }),
      data: [],
      error: null,
    }),
    insert: () => ({
      data: null,
      error: null,
    }),
    update: () => ({
      data: null,
      error: null,
    }),
    delete: () => ({
      data: null,
      error: null,
    }),
  }),
  
  // Storage methods
  storage: {
    from: () => ({
      upload: () => ({
        data: { path: "" },
        error: null,
      }),
      getPublicUrl: () => ({
        data: { publicUrl: "" },
      }),
    }),
  },
};
