import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { SEARCH_DEBOUNCE_MS } from "@shared/configs";
import type { Session } from "@shared/models";
import { selectCurrentUser } from "@shared/store/auth";
import { useAppDispatch, useAppSelector } from "@shared/store/hooks";
import {
  getSessionsByDoctorId,
  selectDoctorSessions,
  selectIsDoctorSessionsLoading,
} from "@shared/store/session";
import { spacing, useStyles, type AppTheme } from "@shared/theme";
import { EmptyState, SearchField } from "@shared/ui";
import { DoctorSessionsHeader, SessionRow } from "@widgets";

export function DoctorSessionsScreen() {
  const styles = useStyles(createStyles);

  const dispatch = useAppDispatch();

  const doctorId = useAppSelector(selectCurrentUser)?.id;

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const trimmedQuery = debouncedSearch.trim();

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedSearch(search), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    if (!doctorId) return;
    dispatch(
      getSessionsByDoctorId({
        doctorId,
        search: trimmedQuery.length ? trimmedQuery : undefined,
      })
    );
  }, [dispatch, doctorId, trimmedQuery]);

  const sessions = useAppSelector((state) => selectDoctorSessions(state, doctorId));
  const sessionCount = sessions.length;
  const isSessionsLoading = useAppSelector(selectIsDoctorSessionsLoading);

  const renderItem = useCallback(({ item }: { item: Session }) => {
    return <SessionRow session={item} />;
  }, []);

  const keyExtractor = useCallback((item: Session) => item.id, []);

  const handleChangeSearch = useCallback((text: string) => {
    setSearch(text);
  }, []);

  const listHeader = useMemo(
    () => (
      <SearchField
        value={search}
        onChangeText={handleChangeSearch}
        loading={isSessionsLoading}
      />
    ),
    [handleChangeSearch, search, isSessionsLoading]
  );

  const ListEmptyComponent = useMemo(
    () => (
      <EmptyState
        title="No upcoming sessions"
        subtitle="Scheduled sessions will appear here"
      />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <DoctorSessionsHeader sessionCount={sessionCount} />

      <FlatList
        data={sessions}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        initialNumToRender={10}
        contentContainerStyle={styles.list}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
}

function createStyles(t: AppTheme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: t.colors.background },
    list: { paddingHorizontal: spacing.xxl, paddingVertical: spacing.xxl },
  });
}
