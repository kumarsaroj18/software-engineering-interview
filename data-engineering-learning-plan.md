# Senior Data Engineering Interview Handbook

**Distributed Data Systems, SQL Internals, Data Warehousing, Streaming, Spark, BigQuery, Snowflake, Kafka, Airflow & Production Data Platforms**

---

# Overview

This handbook is designed as a comprehensive interview preparation guide for Senior and Staff Data Engineer roles at FAANG and other large-scale technology companies.

The focus is not only on building data pipelines, but on understanding how distributed data systems work internally, how query optimizers make decisions, how modern data warehouses execute SQL, and how to debug performance issues in production.

The topics are inspired by common interview patterns at Google, Meta, Amazon, Netflix, Uber, Airbnb, Databricks, Snowflake, Stripe, LinkedIn, and other data-driven companies. They also reflect the deep-dive style seen throughout the attached interview preparation material, which emphasizes optimizer behavior, MVCC, join algorithms, cardinality estimation, nested pruning, and production debugging rather than surface-level SQL knowledge.  [oai_citation:0‡Data Engineering Interview Preparation.html](sediment://file_0000000072ec7209b7a8f18f1eb7ad0e)

## Estimated Scope

- **180 to 250 pages**
- **60,000 to 80,000 words**
- **18 major chapters**
- **150+ architecture diagrams**
- **200+ SQL examples**
- **100+ Spark examples**
- **Real production incidents**
- **FAANG-style interview discussions**

---

# Part I — SQL & Query Processing Internals

## Chapter 1

### How does a SQL query actually execute inside a distributed query engine?

### Sections

1. Interviewer's Intent
2. 60-Second Interview Answer
3. SQL Parsing
4. Logical Plan
5. Query Rewriting
6. Cost-Based Optimizer
7. Physical Plan
8. Execution Operators
9. Volcano Iterator Model
10. Vectorized Execution
11. Columnar Processing
12. Predicate Pushdown
13. Projection Pushdown
14. Runtime Filters
15. Production Example
16. Common Interview Questions

**Estimated Length:** 15 pages

---

## Chapter 2

### Why did the optimizer choose a full table scan instead of using an index?

### Sections

- Interviewer's Intent
- Statistics
- Histograms
- Cardinality Estimation
- Cost Model
- Index Selectivity
- Sequential Scan
- Bitmap Index Scan
- Index Only Scan
- Data Skew
- EXPLAIN Plans
- EXPLAIN ANALYZE
- Production Debugging
- Best Practices

---

## Chapter 3

### How do query optimizers determine join order?

### Sections

- Interviewer's Intent
- Cost Based Optimization
- Join Enumeration
- Dynamic Programming
- Bushy Trees
- Left Deep Trees
- Cardinality Estimation
- Join Reordering
- Hash Join
- Merge Join
- Nested Loop Join
- Join Hints
- PostgreSQL
- BigQuery
- Snowflake
- Spark Catalyst
- Production Examples

---

## Chapter 4

### Why does joining a small table with a large table usually perform better?

### Sections

- Intermediate Result Explosion
- Hash Table Build Side
- Probe Side
- Memory Consumption
- Shuffle Cost
- Broadcast Join
- Partitioned Join
- Adaptive Query Execution
- Real Production Incident

---

## Chapter 5

### What is predicate pushdown, projection pushdown, and nested pruning?

### Sections

- Predicate Pushdown
- Projection Pushdown
- Nested Pruning
- Column Pruning
- Parquet
- ORC
- Capacitor
- Delta Lake
- Iceberg
- Hudi
- BigQuery Storage
- Performance Impact

---

# Part II — Storage Engines & Database Internals

## Chapter 6

### Explain MVCC from first principles.

### Sections

- Why MVCC Exists
- Version Chains
- Snapshots
- xmin/xmax
- Visibility Rules
- Snapshot Isolation
- Vacuum
- Garbage Collection
- HOT Updates
- Autovacuum
- Bloat
- Read Committed
- Repeatable Read
- Serializable
- Production Debugging

---

## Chapter 7

### Explain database locking mechanisms.

### Sections

- Shared Locks
- Exclusive Locks
- Intent Locks
- Row Locks
- Page Locks
- Table Locks
- Deadlocks
- Lock Escalation
- Lock Compatibility Matrix
- Blocking Queries
- Production Debugging

---

## Chapter 8

### Why does a query suddenly become slow after months of working correctly?

### Sections

- Statistics Drift
- Data Skew
- Parameter Sniffing
- Index Fragmentation
- Vacuum Problems
- Plan Cache
- Cardinality Errors
- Spill to Disk
- Memory Grants
- Production Investigation

---

# Part III — Data Warehousing

## Chapter 9

### How would you design a warehouse for petabyte-scale analytics?

### Sections

- Star Schema
- Snowflake Schema
- Fact Tables
- Dimension Tables
- Slowly Changing Dimensions
- Partitioning
- Clustering
- Materialized Views
- Data Modeling
- Cost Optimization

---

## Chapter 10

### How does BigQuery execute SQL differently from PostgreSQL?

### Sections

- Serverless Architecture
- Dremel Tree
- Capacitor Storage
- Columnar Reads
- Shuffle Service
- Slots
- Query Stages
- Nested Data
- Slot Scheduling
- Cost Optimization

---

## Chapter 11

### Explain how Snowflake works internally.

### Sections

- Shared Data Architecture
- Storage Layer
- Compute Layer
- Cloud Services
- Micro-partitions
- Pruning
- Time Travel
- Clustering Keys
- Warehouse Scaling
- Query Cache

---

# Part IV — Apache Spark

## Chapter 12

### Explain how Spark executes a job.

### Sections

- DAG
- Catalyst Optimizer
- Tungsten
- RDD
- DataFrame
- Dataset
- Whole Stage Code Generation
- Lazy Evaluation
- Physical Plan
- Shuffle
- Stage Boundaries
- Fault Recovery

---

## Chapter 13

### Why are Spark jobs spilling to disk?

### Sections

- Shuffle Spill
- Executor Memory
- GC Pressure
- Skew
- Broadcast Threshold
- AQE
- Repartition
- Coalesce
- Join Strategies
- Debugging Spark UI

---

# Part V — Streaming Systems

## Chapter 14

### Design a real-time event processing pipeline.

### Sections

- Kafka
- Event Time
- Processing Time
- Watermarks
- Exactly Once
- At Least Once
- Out-of-Order Events
- Windowing
- State Management
- Flink
- Spark Streaming
- Beam

---

## Chapter 15

### How do you guarantee exactly-once processing?

### Sections

- Idempotency
- Kafka Transactions
- Checkpointing
- State Stores
- Replay
- Deduplication
- Watermarks
- Failure Recovery
- Trade-offs

---

# Part VI — Production Data Engineering

## Chapter 16

### A daily ETL pipeline suddenly takes three times longer. How do you investigate?

### Sections

- Data Volume Growth
- Shuffle
- Skew
- Executor Failures
- Metadata
- Small Files
- Network Bottlenecks
- Storage Throughput
- Query Plans
- Production Runbook

---

## Chapter 17

### Your dashboard shows incorrect metrics after deployment. How do you debug it?

### Sections

- Data Validation
- Reconciliation
- Data Contracts
- Schema Evolution
- Null Handling
- Duplicate Events
- Late Arriving Data
- Backfills
- CDC Issues
- Root Cause Analysis

---

## Chapter 18

### Design a modern lakehouse platform for a global organization.

### Sections

- Data Lake
- Data Warehouse
- Delta Lake
- Apache Iceberg
- Apache Hudi
- Medallion Architecture
- Bronze
- Silver
- Gold
- Governance
- Metadata Catalog
- Lineage
- Access Control
- Cost Optimization

---

# Standard Chapter Template

Every chapter follows the same structure.

## 1. Interviewer's Intent

Explain what the interviewer is evaluating and the senior-level signals they expect.

---

## 2. 60-Second Interview Answer

Provide a concise, interview-ready response.

---

## 3. Deep Technical Dive

Explain the concept from first principles with implementation details and trade-offs.

---

## 4. Internal Working

Cover internals such as:

- Query Optimizer
- Storage Engine
- Spark Catalyst
- Kafka Internals
- BigQuery Execution
- Snowflake Architecture
- MVCC
- Lock Manager
- Cost-Based Optimization

---

## 5. Architecture Diagrams

Each chapter should include diagrams.

Example:

```text
SQL Query
     │
     ▼
SQL Parser
     │
     ▼
Logical Plan
     │
     ▼
Cost Based Optimizer
     │
     ▼
Physical Plan
     │
     ▼
Execution Engine
     │
     ▼
Distributed Workers
```

Example:

```text
Kafka
   │
   ▼
Spark Streaming
   │
   ▼
Delta Lake
   │
   ▼
BigQuery
   │
   ▼
Looker
```

---

## 6. SQL Examples

Include production-quality SQL demonstrating:

- Query optimization
- Execution plans
- Window functions
- Recursive CTEs
- Aggregations
- Partition pruning
- Materialized views

---

## 7. Spark Examples

Include production-quality examples covering:

- DataFrames
- Catalyst plans
- AQE
- Broadcast joins
- Partition tuning
- Skew handling
- Performance optimization

---

## 8. Production Incident

Each chapter should include a real-world production incident describing:

- Symptoms
- Root Cause
- Investigation
- Resolution
- Lessons Learned

---

## 9. Debugging Workflow

Provide a systematic debugging approach.

Include:

- EXPLAIN ANALYZE
- Spark UI
- BigQuery Execution Details
- Snowflake Query Profile
- Airflow Logs
- Kafka Consumer Lag
- Memory Usage
- Shuffle Metrics
- Storage Metrics

---

## 10. Common Mistakes

Highlight common implementation mistakes and how to avoid them.

---

## 11. Trade-offs

Discuss:

- Performance
- Scalability
- Cost
- Consistency
- Reliability
- Operational Complexity

---

## 12. Follow-up Interview Questions

Include likely follow-up questions and strong answers.

---

## 13. Summary

Summarize the key interview takeaways.

---

# Appendices

## Appendix A — SQL Optimization Cheat Sheet

- Join Algorithms
- Predicate Pushdown
- Projection Pushdown
- Window Functions
- Recursive CTEs
- Execution Plans

---

## Appendix B — PostgreSQL Internals

- MVCC
- Vacuum
- HOT Updates
- Lock Manager
- Visibility Rules

---

## Appendix C — BigQuery Deep Dive

- Dremel
- Capacitor
- Slot Scheduling
- Nested Pruning
- Cost Optimization

---

## Appendix D — Snowflake Deep Dive

- Micro-partitions
- Query Profile
- Result Cache
- Warehouse Scaling

---

## Appendix E — Apache Spark Cheat Sheet

- Catalyst
- Tungsten
- AQE
- Broadcast Joins
- Shuffle Optimization

---

## Appendix F — Kafka Deep Dive

- Partitions
- Replication
- Consumer Groups
- Transactions
- Exactly Once

---

## Appendix G — Data Modeling

- Star Schema
- Snowflake Schema
- SCD Types
- Data Vault
- Medallion Architecture

---

## Appendix H — Airflow

- DAG Design
- Scheduling
- Sensors
- Backfills
- Failure Recovery

---

## Appendix I — Lakehouse Technologies

- Delta Lake
- Apache Iceberg
- Apache Hudi
- Metadata Management

---

## Appendix J — Data Engineering System Design

Common FAANG interview problems:

- Design Uber's ETL Platform
- Design YouTube Analytics
- Design a Real-Time Fraud Detection Pipeline
- Design a CDC Platform
- Design a Clickstream Analytics System
- Design a Data Lake
- Design a Metrics Platform
- Design a Feature Store
- Design a Log Analytics Platform
- Design a Streaming Recommendation Pipeline

---

## Appendix K — Production Debugging Checklist

- Slow Queries
- Data Skew
- Shuffle Bottlenecks
- OOM Errors
- Spill to Disk
- Small Files
- Hot Partitions
- Missing Partitions
- Late Data
- Duplicate Data
- Schema Drift
- Metadata Corruption

---

## Appendix L — Senior Data Engineering Interview Cheat Sheet

A condensed revision guide covering:

- SQL Internals
- Query Optimization
- Distributed Query Engines
- Spark
- Kafka
- Airflow
- BigQuery
- Snowflake
- Delta Lake
- Iceberg
- PostgreSQL Internals
- Data Warehousing
- Lakehouse Architecture
- Streaming Systems
- Data Modeling
- Production Debugging
- Data Engineering System Design

---

# Final Deliverable

The completed handbook will provide:

- Comprehensive explanations for all 18 interview questions
- Production-grade SQL and Spark examples
- Distributed query processing internals
- Modern data warehouse architecture
- Storage engine internals
- Streaming system design
- Lakehouse architecture
- Real production debugging workflows
- Architecture and execution diagrams
- Cost and performance optimization strategies
- Trade-off analysis
- Interview-ready summaries
- Comprehensive reference appendices

The emphasis throughout the handbook is on the depth expected in Senior and Staff Data Engineering interviews, where candidates are expected to explain why optimizers choose specific execution plans, how distributed query engines minimize I/O through techniques like predicate and nested pruning, how MVCC and locking affect concurrency, and how to diagnose production performance issues rather than simply writing correct SQL.