import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Response } from '../backend';

export function useSubmitResponse() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (answer: boolean) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitResponse(answer);
    },
    onSuccess: () => {
      // Invalidate responses query to refetch latest data
      queryClient.invalidateQueries({ queryKey: ['allResponses'] });
    },
  });
}

export function useGetAllResponses() {
  const { actor, isFetching } = useActor();

  return useQuery<Response[]>({
    queryKey: ['allResponses'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.fetchAllResponsesAsArray();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}
